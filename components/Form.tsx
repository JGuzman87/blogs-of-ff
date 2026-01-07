"use client"
import { useState } from 'react'
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Form = () => {

  const path = usePathname();

    const [user, setUser ] = useState({
        username: "",
        email:"",
        password:""
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUser(prevUser => ({...prevUser, [name]: value}))
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
          console.log(user);
        setUser({ username: "", email: "", password: "" });
      
    };

  return (
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{type: "tween"}}
        className="flex flex-col gap-2 p-2 bg-white/30 backdrop-blur-md w-md rounded-xl"
        onSubmit={handleSubmit}
      >
        {path === "/signup" && (
          <>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              placeholder="enter username..."
              onChange={handleChange}
              className="p-2 bg-white/20"
              required
            />
          </>
        )}
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="enter email..."
          onChange={handleChange}
          className="p-2 bg-white/20 "
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="enter passwod..."
          onChange={handleChange}
          className="p-2 bg-white/20"
          required
        />
        <button type="submit" className="btn btn-ghost">
          Login
        </button>
      </motion.form>
    </AnimatePresence>
  );
}

export default Form