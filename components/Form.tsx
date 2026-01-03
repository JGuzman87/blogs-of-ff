"use client"
import { useState } from 'react'

const Form = () => {

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
    <form className="flex flex-col gap-2 p-2 bg-black/30 backdrop-blur-sm w-md" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={user.username}
        placeholder="enter username..."
        onChange={handleChange}
        className="p-2"
        required
      />
      <label htmlFor="username">User Name</label>
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="enter email..."
        onChange={handleChange}
        className="p-2"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="enter passwod..."
        onChange={handleChange}
        className="p-2"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Form