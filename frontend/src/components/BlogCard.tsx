import { Link } from "react-router-dom"

interface BlogCardProp {
	title : string,
	authorName : string,
	content : string,
	publishedDate : string
	id : string
}

export const BlogCard = ({title, authorName, content, publishedDate, id} : BlogCardProp) => {
	return <Link to={`/blog/${id}`}>
			<div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
			<div className="flex">
				<div className="flex justify-center flex-col">
					<Avatar name={authorName}/>
				</div>
				<div className="font-extralight flex flex-col text-sm justify-center pl-2">
					{authorName}
				</div>
				<div className="flex flex-col justify-center pl-2">
					<Circle/>
				</div>
				<div className="pl-2 text-sm font-thin flex flex-col justify-center text-slate-500">
					{publishedDate}
				</div>
			</div>			
			<div className="text-xl font-semibold pt-2">
				{title}
			</div>
			<div className="text-md font-thin">
				{content.length > 100 ? content.slice(0,100) + "......." : content}
			</div>
			<div className="text-slate-500 text-sm font-thin pt-4">
				{`${Math.ceil(content.length / 100)} minutes(s) read`}
			</div>
		</div>
	</Link> 
	 
}

function Circle(){
	return <div className="h-1 w-1 rounded-full bg-slate-500">
	</div>
}

export function Avatar({name, size = "small"} : {name : string, size? : "small" | "big"}){
	const authorName = name.split(" ").map(word => word[0]).join("");
	return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    		<span className={`${size === "small" ? "text-xs" : "text-md"}
			text-xs font-extralight text-gray-600 dark:text-gray-300`}>{authorName}</span>
		</div>
}