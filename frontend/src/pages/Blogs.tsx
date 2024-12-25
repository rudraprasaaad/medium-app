import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar"
import { Avatar, BlogCard } from "../components/BlogCard"

import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const [numSkeletons, setNumSkeletons] = useState(0);

    useEffect(() => {
        const updateNumSkeletons = () => {
            const skeletonHeight = 200; // Approximate height of each skeleton in pixels
            const viewportHeight = window.innerHeight;
            const num = Math.ceil(viewportHeight / skeletonHeight);
            setNumSkeletons(num);
        };

        updateNumSkeletons();
        window.addEventListener('resize', updateNumSkeletons);

        return () => {
            window.removeEventListener('resize', updateNumSkeletons);
        };
    }, []);

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                {Array.from({ length: numSkeletons }).map((_, index) => (
                    <BlogsSkeleton key={index} />
                ))}
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}


const BlogsSkeleton = () => {
    return <>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name="" />
                </div>
                <div className="font-extralight flex flex-col text-sm justify-center pl-2">
                    <div className="bg-slate-200 h-6 w-24 mb-2"></div>
                </div>
                <div className="flex flex-col justify-center pl-2">
                    {/* <Circle /> */}
                </div>
                <div className="pl-2 text-sm font-thin flex flex-col justify-center text-slate-500">
                    <div className="bg-slate-200 h-6 w-24 mb-2"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="bg-slate-200 h-8 w-3/4 mb-2"></div>
            </div>
            <div className="text-md font-thin">
                <div className="bg-slate-200 h-6 w-full mb-2"></div>
                <div className="bg-slate-200 h-6 w-5/6 mb-2"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="bg-slate-200 h-6 w-1/4"></div>
            </div>
        </div>
    </>
}