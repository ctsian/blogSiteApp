import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById } from "../services/blogService";
import {
  Container,
  Typography,
  Box,
  Avatar,
  IconButton,
  CircularProgress
} from "@mui/material";
import { ArrowBack, Person } from "@mui/icons-material";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found or failed to load.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: "calc(100vh - 80px)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#fafafa"
      }}>
        <CircularProgress sx={{ color: "#242424" }} />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Box sx={{ 
        minHeight: "calc(100vh - 80px)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#fafafa"
      }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#242424" }}>
            {error || "Blog not found"}
          </Typography>
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#242424",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#000000",
              }
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "calc(100vh - 80px)", py: 8 }}>
      <Container maxWidth="md">
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            mb: 4,
            color: "#6B6B6B",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              color: "#242424",
            }
          }}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "36px", sm: "48px", md: "56px" },
              color: "#242424",
              mb: 3,
              lineHeight: 1.2,
              letterSpacing: "-0.02em"
            }}
          >
            {blog.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#6366f1",
                  fontSize: "16px",
                  fontWeight: 600
                }}
              >
                {blog.authorUsername?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography sx={{ color: "#242424", fontWeight: 600, fontSize: "16px" }}>
                  {blog.authorUsername || "Anonymous"}
                </Typography>
                {blog.createdAt && (
                  <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                    {formatDate(blog.createdAt)}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
              <Typography sx={{ color: "#9CA3AF", fontSize: "15px" }}>
                {calculateReadingTime(blog.content)} min read
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            py: 3,
            mb: 6
          }}
        />

        <Box
          sx={{
            "& p": {
              fontSize: "21px",
              lineHeight: 1.8,
              color: "#242424",
              mb: 3,
              fontFamily: "inherit"
            },
            "& p:last-child": {
              mb: 0
            }
          }}
        >
          {blog.content.split("\n").map((paragraph, index) => (
            <Typography key={index} component="p">
              {paragraph || "\u00A0"}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            pt: 4,
            mt: 8,
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#6366f1",
              fontSize: "18px",
              fontWeight: 600
            }}
          >
            {blog.authorUsername?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Box>
            <Typography sx={{ color: "#242424", fontWeight: 600, fontSize: "16px" }}>
              {blog.authorUsername || "Anonymous"}
            </Typography>
            <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
              Author
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

