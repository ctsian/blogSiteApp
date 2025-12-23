import { useState } from "react";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { getUsername, isAuthenticated } from "../utils/authUtil";
import TrendingBlogs from "./TrendingBlogs";
import FeaturedBlogs from "./FeaturedBlogs";
import YourBlogs from "./YourBlogs";

export default function BlogList() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || location.state?.tab || "trending";
  const [tab, setTab] = useState(initialTab); // trending | featured | yours
  const navigate = useNavigate();

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
              onClick={() => {
                setTab("trending");
                setSearchParams(prev => {
                  const q = searchParams.get("q");
                  return q ? { tab: "trending", q } : { tab: "trending" };
                });
              }}
              sx={{ textTransform: "none", backgroundColor: tab === "trending" ? "#242424" : undefined, "&:hover": { backgroundColor: tab === "trending" ? "#000000" : undefined } }}
            >
              Trending
            </Button>
            <Button
              variant={tab === "featured" ? "contained" : "outlined"}
              onClick={() => {
                setTab("featured");
                setSearchParams(prev => {
                  const q = searchParams.get("q");
                  return q ? { tab: "featured", q } : { tab: "featured" };
                });
              }}
              sx={{ textTransform: "none", backgroundColor: tab === "featured" ? "#242424" : undefined, "&:hover": { backgroundColor: tab === "featured" ? "#000000" : undefined } }}
            >
              Featured
            </Button>
            {isAuthenticated() && (
              <Button
                variant={tab === "yours" ? "contained" : "outlined"}
                onClick={() => {
                  setTab("yours");
                  setSearchParams(prev => {
                    const q = searchParams.get("q");
                    return q ? { tab: "yours", q } : { tab: "yours" };
                  });
                }}
                sx={{ textTransform: "none", backgroundColor: tab === "yours" ? "#242424" : undefined, "&:hover": { backgroundColor: tab === "yours" ? "#000000" : undefined } }}
              >
                Your blogs
              </Button>
            )}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {tab === "trending" && <TrendingBlogs />}
          {tab === "featured" && <FeaturedBlogs />}
          {tab === "yours" && <YourBlogs />}
        </Box>
      </Container>
    </Box>
  );
}
