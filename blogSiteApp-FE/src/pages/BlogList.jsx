import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(b => (
        <div key={b.id}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>
          <small>By {b.authorUsername}</small>
        </div>
      ))}
    </div>
  );
}
