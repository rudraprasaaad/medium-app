import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            <Appbar />
        
            <div className="flex justify-center">
          <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10">
            <div className="col-span-8">
              <div className="text-5xl font-extrabold bg-slate-200 h-12 w-3/4 mb-4"></div>
              <div className="text-slate-500 pt-2 bg-slate-200 h-6 w-1/4 mb-4"></div>
              <div className="pt-4 bg-slate-200 h-40 w-full"></div>
            </div>
            <div className="col-span-4">
            <div className="text-slate-600 bg-slate-200 h-6 w-1/4 mb-4"></div>
              <div className="flex w-full">
                <div className="pr-4 flex flex-col justify-center">
                  <Avatar size="big" name="" />
                </div>
                <div>
                <div className="text-xl bg-slate-200 h-6 w-1/2 mb-2"></div>
                <div className="pt-2 bg-slate-200 h-6 w-3/4 mb-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>       
    </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}