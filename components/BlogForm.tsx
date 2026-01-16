"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const BlogForm = () => {
  const [post, setPost] = useState({ title: "", content: "" });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log( post )
    setPost({ title: "", content: "" });
  }

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    setPost(prevPost => ({ ...prevPost, [name]: value}))
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", ease: "easeInOut", duration: 1 }}
      className="flex flex-col bg-white/30 md:w-1/2 p-2 gap-2 rounded-2xl"
      onSubmit={handleSubmit}
    >
      <label htmlFor="title"> Title</label>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleChange}
        className="p-2 bg-white/20"
      />
      <label htmlFor="content"> Post Content</label>
      <textarea
        name="content"
        value={post.content}
        onChange={handleChange}
        className="p-2 bg-white/20"
      />
      <button type="submit" className="btn btn-ghost">
        Submit
      </button>
    </motion.form>
  );
};

export default BlogForm;
