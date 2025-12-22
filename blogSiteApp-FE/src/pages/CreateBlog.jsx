import { useState } from "react";
import { createBlog } from "../services/blogService";

export default function CreateBlog() {
  const [blog, setBlog] = useState({ title: "", content: "" });

  const submit = async () => {
    await createBlog(blog);
    alert("Blog created");
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <input placeholder="Title" onChange={e => setBlog({ ...blog, title: e.target.value })} />
      <textarea placeholder="Content" onChange={e => setBlog({ ...blog, content: e.target.value })} />
      <button onClick={submit}>Create</button>
    </div>
  );
}
