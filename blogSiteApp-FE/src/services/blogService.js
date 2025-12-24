import api from "../api/axios";

export const getBlogs = () =>
  api.get("/api/v1.0/blogsite/blog");

export const getBlogById = (id) =>
  api.get(`/api/v1.0/blogsite/blog/${id}`);

export const createBlog = (data) =>
  api.post("/api/v1.0/blogsite/blog/add", data);

export const deleteBlog = (id) =>
  api.delete(`/api/v1.0/blogsite/blog/${id}`);

export const updateBlog = (id, data) =>
  api.put(`/api/v1.0/blogsite/blog/${id}`, data);

export const getBlogsByCategory = (category) =>
  api.get(`/api/v1.0/blogsite/blog/category/${encodeURIComponent(category)}`);

export const getBlogsByAuthor = (author) =>
  api.get(`/api/v1.0/blogsite/blog/author/${encodeURIComponent(author)}`);

export const likeBlog = (id) =>
  api.post(`/api/v1.0/blogsite/blog/${id}/like`);

export const getTrendingBlogs = () =>
  api.get("/api/v1.0/blogsite/blog/feed/trending");

export const getFeaturedBlogs = () =>
  api.get("/api/v1.0/blogsite/blog/feed/featured");

export const getFollowSummary = (username) =>
  api.get(`/api/v1.0/blogsite/blog/follow/${encodeURIComponent(username)}`);

export const followUser = (username) =>
  api.post(`/api/v1.0/blogsite/blog/follow/${encodeURIComponent(username)}`);

export const unfollowUser = (username) =>
  api.delete(`/api/v1.0/blogsite/blog/follow/${encodeURIComponent(username)}`);