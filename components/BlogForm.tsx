"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BlogForm = () => {
  interface BlogPosts {
    _id: number;
    title: string;
    content: string;
  }

  const [post, setPost] = useState({ title: "", content: "" });
  const [storedPost, setStoredPost] = useState<BlogPosts[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/blogpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: post.title, content: post.content }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(post);
        setStoredPost((prevData) => [...prevData, data]);
        setPost({ title: "", content: "" });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/blogpost");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStoredPost(data);
      }
    };
    fetchPost();
  }, [storedPost.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", ease: "easeInOut", duration: 1 }}
        className="flex flex-col col-span-2 bg-black/30  p-2 gap-2 rounded-2xl "
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
      <motion.div
        className="card gap-2 col-span-3"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", ease: "easeInOut", duration: 1 }}
      >
        {storedPost.length > 0 &&
          storedPost.map((stored) => (
            <motion.div
              key={stored._id}
              className="card-body bg-white/30 text-black "
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", ease: "easeInOut", duration: 1 }}
            >
              <h2 className="font-bold text-2xl">{stored.title}</h2>
              <p>{stored.content}</p>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default BlogForm;
