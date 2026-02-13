"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PostCard from "./PostCard";

const BlogForm = () => {
  const queryClient = useQueryClient();

  interface BlogPost {
    title: string;
    content: string;
  }

  const [post, setPost] = useState<BlogPost>({ title: "", content: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async (newPost: BlogPost) => {
      const response = await fetch("/api/blogpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    mutation.mutate(post);

    setPost({ title: "", content: "" });
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await fetch("api/blogpost");
      return await response.json();
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", ease: "easeInOut", duration: 1 }}
        className="flex flex-col col-span-1 bg-black/30 backdrop-blur-md  p-1 gap-2 rounded-2xl md:h-50"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="font-bold">
          {" "}
          Title
        </label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="p-2 bg-white/20 font-bold"
          required
        />
        <label htmlFor="content" className="font-bold">
          {" "}
          Post Content
        </label>
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          className="p-2 bg-white/20"
          required
        />
        <button type="submit" className="btn btn-ghost">
          Submit
        </button>
      </motion.form>
      <PostCard isPending={isPending} data={data} error={error} />
    </div>
  );
};

export default BlogForm;
