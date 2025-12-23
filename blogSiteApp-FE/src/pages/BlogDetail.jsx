import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, getBlogById, likeBlog, getFollowSummary, followUser, unfollowUser } from "../services/blogService";
import {
  Container,
  Typography,
  Box,
  Avatar,
  IconButton,
  CircularProgress,
  Chip,
  Menu,
  MenuItem,
  Stack
} from "@mui/material";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getUsername, isAuthenticated } from "../utils/authUtil";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liking, setLiking] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
        setLikes(res.data.likes ?? 0);
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

  useEffect(() => {
    const loadFollow = async () => {
      if (!blog?.authorUsername) return;
      try {
        const res = await getFollowSummary(blog.authorUsername);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
      } catch {
        setFollowers(0);
        setFollowing(false);
      }
    };
    loadFollow();
  }, [blog?.authorUsername]);

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

  const canDelete = () => {
    return isAuthenticated() && blog && blog.authorUsername === getUsername();
  };

  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDelete = async () => {
    if (!canDelete()) return;
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;
    handleMenuClose();
    setDeleting(true);
    try {
      await deleteBlog(blog.id);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete blog.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!canDelete()) return;
    handleMenuClose();
    navigate(`/blog/${id}/edit`);
  };

  const handleLike = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    setLiking(true);
    try {
      const res = await likeBlog(blog.id);
      setLikes(res.data.likes ?? likes + 1);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to like blog.");
    } finally {
      setLiking(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareText = blog ? encodeURIComponent(blog.title) : "";

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
            onClick={() => navigate("/blogs")}
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1 }}>
          <IconButton
            onClick={() => navigate("/blogs")}
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
        </Box>

        <Box sx={{ mb: 6, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "36px", sm: "48px", md: "56px" },
                color: "#242424",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                flex: 1
              }}
            >
              {blog.title}
            </Typography>
            {canDelete() && (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    color: "#6B6B6B",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      color: "#242424",
                    }
                  }}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete} disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</MenuItem>
                </Menu>
              </>
            )}
          </Box>

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
                <Typography
                  sx={{ color: "#242424", fontWeight: 600, fontSize: "16px", cursor: "pointer" }}
                  onClick={() => blog.authorUsername && navigate(`/user/${blog.authorUsername}`)}
                >
                  {blog.authorUsername || "Anonymous"}
                </Typography>
                {blog.category && (
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{ mt: 0.5, backgroundColor: "#eef2ff", color: "#4338ca", height: 22 }}
                  />
                )}
                {blog.createdAt && (
                  <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                    {formatDate(blog.createdAt)}
                  </Typography>
                )}
                <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>
                  {followers} followers
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                size="small"
                component="a"
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={handleLike} disabled={liking}>
                  {liking ? <FavoriteBorderIcon /> : <FavoriteIcon color="error" />}
                </IconButton>
                <Typography sx={{ color: "#9CA3AF", fontSize: "15px" }}>
                  {likes} likes
                </Typography>
              </Stack>
              <Chip
                label={following ? "Following" : "Follow"}
                color={following ? "default" : "primary"}
                onClick={async () => {
                  if (!isAuthenticated()) {
                    navigate("/login");
                    return;
                  }
                  try {
                    if (following) {
                      await unfollowUser(blog.authorUsername);
                      setFollowing(false);
                      setFollowers((f) => Math.max(0, f - 1));
                    } else {
                      await followUser(blog.authorUsername);
                      setFollowing(true);
                      setFollowers((f) => f + 1);
                    }
                  } catch {
                    // ignore errors for now
                  }
                }}
                sx={{ cursor: "pointer" }}
              />
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
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
        </Box>
      </Container>
    </Box>
  );
}

