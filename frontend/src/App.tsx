import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
export default function App(){
  return (
  <>
  <Suspense>
  <RecoilRoot>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/publish" element={<Publish/>}/>
        </Routes>
      </BrowserRouter>
  </RecoilRoot>
  </Suspense>
  </>
);}