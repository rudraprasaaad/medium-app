import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@rudraprasaaad/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type Variables = {
	userId : string
}


export const blogRoute = new Hono<{
	Bindings : {
		DATABASE_URL : string
		JWT_SECRET : string
	}
	Variables : Variables
}>();


blogRoute.use("/*", async (c, next) => {
	const authHeader = c.req.header("Authorization") || "";

	try{
		const user = await verify(authHeader, c.env.JWT_SECRET);
		if(user){
			c.set("userId", String(user.id));
			await next();
		}
		else{
			c.status(403);
			c.json({
				msg : "You are not logged In"
			})
		}
	}
	catch(e){
		c.status(403);
		return c.json({
			msg : "You are not logged In"
		})
	}
})

blogRoute.post("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const success = createBlogInput.safeParse(body);
		if(!success){
			c.status(411);
			return c.json({
				msg : "Invalid Input"
			})
	}
	const authorId = c.get("userId")
	const blog = await prisma.post.create({
		data : {
			title : body.title,
			content : body.content,
			authorId : authorId,
		}
	})

	return c.json({
		id : blog.id
	})
})


blogRoute.put("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const success = updateBlogInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg : "Invalid Input"
		})
	}

	try{
		const blog = await prisma.post.update({
			where: {
				id: body.id
			},
			data: {
				title: body.title,
				content: body.content,
			}
		})

		return c.json({
			id : blog.id
		})
	}
	catch(e){
		c.status(411);
		return c.json({msg : "Unable to update blog "});
	}
})


blogRoute.get("/get", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const id = await c.req.query("id");

	try{
		const blog = await prisma.post.findFirst({
			where : {
				id : String(id)
			}
		})

		return c.json({
			blog
		})
	}
	catch(e){
		c.status(404);
		return c.json({msg : "Unable to found any blog"})
	}

})

blogRoute.get("/bulk", async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const blogs = await prisma.post.findMany({
		select : {
			content : true,
			title : true,
			id : true,
			author : {
				select : {
					name : true
				}
			}
		}
	});


	return c.json({
		blogs
	})
})

blogRoute.get("/:id", async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl : c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	
	try{
		const blog = await prisma.post.findFirst({
			where : {
				id : id
			},
			select : {
				id: true,
				title : true,
				content : true,
				author : {
					select : {
						name : true
					}
				}
			}
		})

		return c.json({
			blog
		})
	}catch(e){
		c.status(411);
		return c.json({
			message : "Error while fetching blog post"
		})
	}
})
