import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogsByAuthor } from "../services/blogService";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Divider
} from "@mui/material";

export default function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getBlogsByAuthor(username);
        setBlogs(res.data || []);
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetch();
  }, [username]);

  const stats = useMemo(() => {
    const articleCount = blogs.length;
    const totalLikes = blogs.reduce((sum, b) => sum + (b.likes ?? 0), 0);
    return { articleCount, totalLikes };
  }, [blogs]);

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#6366f1",
              fontSize: "20px",
              fontWeight: 700
            }}
          >
            {username?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#242424" }}>
              {username}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Chip label={`${stats.articleCount} articles`} />
              <Chip label={`${stats.totalLikes} likes`} />
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {loading ? (
          <Typography sx={{ color: "#6B6B6B" }}>Loading...</Typography>
        ) : blogs.length === 0 ? (
          <Typography sx={{ color: "#6B6B6B" }}>No articles yet.</Typography>
        ) : (
          <Stack spacing={2}>
            {blogs.map((blog) => (
              <Card key={blog.id} variant="outlined">
                <CardActionArea onClick={() => navigate(`/blog/${blog.id}`)}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {blog.title}
                    </Typography>
                    <Typography sx={{ color: "#6B6B6B", mb: 1 }}>
                      {blog.content.slice(0, 140)}...
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip label={`${blog.likes ?? 0} likes`} size="small" />
                      {blog.category && <Chip label={blog.category} size="small" />}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}


