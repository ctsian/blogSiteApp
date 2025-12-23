import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function HoverMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (tab) => {
    navigate("/blogs", { state: { tab } });
  };

  // Only show menu overlay on blog-related pages
  const showEdge = true;

  if (!showEdge) return null;

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: 12,
          zIndex: 1200,
        }}
        onMouseEnter={() => setOpen(true)}
      />
      {open && (
        <Box
          onMouseLeave={() => setOpen(false)}
          sx={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: 260,
            zIndex: 1300,
            background: "linear-gradient(90deg, rgba(15,23,42,0.9), rgba(15,23,42,0.0))",
            backdropFilter: "blur(12px)",
            color: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 3,
            pointerEvents: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 12, color: "#9ca3af" }}
          >
            Discover
          </Typography>
          {[
            { key: "trending", label: "Trending" },
            { key: "featured", label: "Featured" },
            { key: "yours", label: "Your blogs" },
          ].map((item) => (
            <Typography
              key={item.key}
              onClick={() => goTo(item.key)}
              sx={{
                mb: 1.5,
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                color: "#e5e7eb",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>
      )}
    </>
  );
}


