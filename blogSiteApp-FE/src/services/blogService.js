import api from "../api/axios";

export const getBlogs = () =>
  api.get("/api/v1.0/blogsite/blog");

export const getBlogById = (id) =>
  api.get(`/api/v1.0/blogsite/blog/${id}`);

export const createBlog = (data) =>
  api.post("/api/v1.0/blogsite/blog", data);
