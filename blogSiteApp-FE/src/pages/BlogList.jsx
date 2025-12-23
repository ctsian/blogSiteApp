import { useEffect, useState } from "react";
import { getBlogsByAuthor, getTrendingBlogs, getFeaturedBlogs } from "../services/blogService";
import { Container, Typography, Box, Avatar, Chip, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Article } from "@mui/icons-material";
import { getUsername, isAuthenticated } from "../utils/authUtil";
import { useLocation } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const initialTab = location.state?.tab || "trending";
  const [tab, setTab] = useState(initialTab); // trending | featured | yours
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (tab === "yours" && getUsername()) {
          const res = await getBlogsByAuthor(getUsername());
          setBlogs(res.data);
        } else if (tab === "featured" && isAuthenticated() && getUsername()) {
          const res = await getFeaturedBlogs();
          setBlogs(res.data);
        } else {
          const res = await getTrendingBlogs();
          setBlogs(res.data);
        }
      } catch (err) {
        console.error(err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [tab]);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography sx={{ color: "#6B6B6B", fontSize: "18px" }}>Loading articles...</Typography>
        </Box>
      </Container>
    );
  }

  if (blogs.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Article sx={{ fontSize: 64, color: "#E5E7EB", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#242424" }}>
            No articles yet
          </Typography>
          <Typography sx={{ color: "#6B6B6B", fontSize: "16px" }}>
            Be the first to share your thoughts!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "32px", sm: "42px", md: "48px" },
              color: "#242424",
              mb: 1,
              letterSpacing: "-0.02em"
            }}
          >
            {tab === "trending" && "Trending"}
            {tab === "featured" && "Featured"}
            {tab === "yours" && (isAuthenticated() && getUsername() ? `Your blogs` : "Your blogs")}
          </Typography>
          <Typography sx={{ color: "#6B6B6B", fontSize: "18px" }}>
            {tab === "trending" && "Most loved and recent articles across the community"}
            {tab === "featured" && "Stories from writers you follow"}
            {tab === "yours" && "Everything you have published"}
          </Typography>
          <Stack direction="row" gap={1} sx={{ mt: 3 }}>
            <Button
              variant={tab === "trending" ? "contained" : "outlined"}
              onClick={() => setTab("trending")}
              sx={{ textTransform: "none", backgroundColor: tab === "trending" ? "#242424" : undefined, "&:hover": { backgroundColor: tab === "trending" ? "#000000" : undefined } }}
            >
              Trending
            </Button>
            <Button
              variant={tab === "featured" ? "contained" : "outlined"}
              onClick={() => setTab("featured")}
              sx={{ textTransform: "none", backgroundColor: tab === "featured" ? "#242424" : undefined, "&:hover": { backgroundColor: tab === "featured" ? "#000000" : undefined } }}
            >
              Featured
            </Button>
            {isAuthenticated() && (
              <Button
                variant={tab === "yours" ? "contained" : "outlined"}
                onClick={() => setTab("yours")}
                sx={{ textTransform: "none", backgroundColor: tab === "yours" ? "#242424" : undefined, "&:hover": { backgroundColor: tab === "yours" ? "#000000" : undefined } }}
              >
                Your blogs
              </Button>
            )}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {blogs.map((blog, index) => (
            <Box
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.id}`)}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                p: { xs: 3, sm: 4 },
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                  borderColor: "rgba(0, 0, 0, 0.12)",
                }
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#6366f1",
                    fontSize: "14px",
                    fontWeight: 600
                  }}
                >
                  {blog.authorUsername?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <Typography sx={{ color: "#242424", fontWeight: 500, fontSize: "15px" }}>
                  {blog.authorUsername || "Anonymous"}
                </Typography>
                {blog.category && (
                  <>
                    <Typography sx={{ color: "#9CA3AF", mx: 0.5 }}>·</Typography>
                    <Chip label={blog.category} size="small" sx={{ backgroundColor: "#eef2ff", color: "#4338ca", height: 24 }} />
                  </>
                )}
                {blog.createdAt && (
                  <>
                    <Typography sx={{ color: "#9CA3AF", mx: 0.5 }}>·</Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                      {formatDate(blog.createdAt)}
                    </Typography>
                  </>
                )}
                <Typography sx={{ color: "#9CA3AF", mx: 0.5 }}>·</Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                  {calculateReadingTime(blog.content)} min read
                </Typography>
                <Typography sx={{ color: "#9CA3AF", mx: 0.5 }}>·</Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                  {blog.likes ?? 0} likes
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "24px", sm: "28px", md: "32px" },
                  color: "#242424",
                  mb: 2,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  "&:hover": {
                    color: "#6366f1",
                  }
                }}
              >
                {blog.title}
              </Typography>

              <Typography
                sx={{
                  color: "#6B6B6B",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  mb: 3,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {blog.content.length > 200 ? `${blog.content.slice(0, 200)}...` : blog.content}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label="Read more"
                    size="small"
                    sx={{
                      backgroundColor: "#f3f4f6",
                      color: "#242424",
                      fontWeight: 500,
                      fontSize: "13px",
                      height: "28px",
                      "&:hover": {
                        backgroundColor: "#e5e7eb",
                      }
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
