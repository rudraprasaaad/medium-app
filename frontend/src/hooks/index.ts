import { atom, useRecoilState } from 'recoil';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export interface Blog {
  "content": string;
  "title": string;
  "id": string
  "author": {
      "name": string
  }
}

const blogState = atom<Blog | undefined>({
    key: 'blogState',
    default: undefined,
});

const blogsState = atom<Blog[]>({
    key: 'blogsState',
    default: [],
});

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useRecoilState(blogState);

    useEffect(() => {
        if (blog && blog.id === id) {
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [id, blog, setBlog]);

    return { blog, loading };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useRecoilState(blogsState);

    useEffect(() => {
        if (blogs.length > 0) {
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [blogs, setBlogs]);

    return { blogs, loading };
};