import { useState } from "react";
import { createBlog } from "../services/blogService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Tooltip
} from "@mui/material";
import { Publish, ArrowBack } from "@mui/icons-material";

export default function CreateBlog() {
  const [blog, setBlog] = useState({ title: "", content: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!blog.title.trim() || !blog.content.trim() || !blog.category.trim()) {
      setError("Please fill in title, content and category");
      return;
    }

    setError("");
    setLoading(true);
    
    try {
      await createBlog(blog);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const wordCount = blog.content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "calc(100vh - 80px)", py: 6 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Back to home">
              <IconButton
                onClick={() => navigate("/")}
                sx={{
                  color: "#6B6B6B",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    color: "#242424",
                  }
                }}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#242424",
                display: { xs: "none", sm: "block" }
              }}
            >
              Create new story
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={submit}
            disabled={loading || !blog.title.trim() || !blog.content.trim()}
            startIcon={<Publish />}
            sx={{
              backgroundColor: "#242424",
              color: "#ffffff",
              textTransform: "none",
              fontSize: "15px",
              fontWeight: 600,
              px: 3,
              py: 1.5,
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#000000",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
              "&:disabled": {
                backgroundColor: "#9CA3AF",
              }
            }}
          >
            {loading ? "Publishing..." : "Publish"}
          </Button>
        </Box>

        {error && (
          <Box
            sx={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              p: 2,
              mb: 4
            }}
          >
            <Typography sx={{ color: "#dc2626", fontSize: "14px" }}>
              {error}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <TextField
            placeholder="Title"
            value={blog.title}
            onChange={e => setBlog({ ...blog, title: e.target.value })}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                color: "#242424",
                lineHeight: 1.2,
                letterSpacing: "-0.02em"
              }
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: 0,
              }
            }}
          />

          <TextField
            placeholder="Tell your story..."
            value={blog.content}
            onChange={e => setBlog({ ...blog, content: e.target.value })}
            multiline
            minRows={20}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: "21px",
                lineHeight: 1.8,
                color: "#242424",
                fontFamily: "inherit"
              }
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: 0,
              },
              "& .MuiInputBase-root": {
                minHeight: "500px",
              }
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 2, borderTop: "1px solid rgba(0, 0, 0, 0.06)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                {wordCount} words
              </Typography>
              <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                {Math.ceil(wordCount / 200)} min read
              </Typography>
            </Box>
            <TextField
              placeholder="Category (e.g. Tech, Travel)"
              value={blog.category}
              onChange={e => setBlog({ ...blog, category: e.target.value })}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: "15px",
                  color: "#242424",
                }
              }}
              sx={{
                "& .MuiInputBase-input": {
                  padding: 0,
                }
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
