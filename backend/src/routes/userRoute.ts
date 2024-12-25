import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify, decode } from "hono/jwt";
import { signinInput, signupInput } from '@rudraprasaaad/medium-common';

export const userRoute = new Hono<{
	Bindings : {
	DATABASE_URL : string
	JWT_SECRET : string
  }
}>()

userRoute.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const success = signupInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg : "Invalid Input"
		})
	}

	try{
		const user = await prisma.user.create({
			data:{
				name : body.name,
				email : body.email,
				password : body.password
			}
		})
	
		const token = await sign({id : user.id}, c.env.JWT_SECRET)
		return c.json({
			token : token
		})	
	}
	catch(e){
		console.log(e);
		c.status(411);
		return c.text("Invalid");
	}	
});

userRoute.post("/signin", async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl : c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body = await c.req.json();
	
	const success = signinInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg : "Invalid Input"
		})
	}

	try{
		const user = await prisma.user.findFirst({
			where:  {
				email : body.email,
				password : body.password
			}
		})
	
		if(!user){
			c.status(403);
			return c.json({msg : "user not found"})
		}
	
		const jwt = await sign({id : user.id}, c.env.JWT_SECRET)
		return c.json({
			token : jwt,
			name : user.name
		})
	}
	catch(e){
		console.log(e);
		c.status(411);
		return c.text("Invalid");
	}
	
})