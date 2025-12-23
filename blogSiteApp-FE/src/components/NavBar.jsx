import { Box, Button, Typography, Chip } from "@mui/material";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/authUtil";
import { useState, useEffect } from "react";
import XLargeLogo from "../assets/XLargeLogo.svg";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const auth = isAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentTab = searchParams.get("tab") || null;
  const showSearch = location.pathname === "/blogs" && (currentTab === null || currentTab === "trending");

  const searchValue = searchParams.get("q") || "";
  const [searchLocal, setSearchLocal] = useState(searchValue);

  useEffect(() => {
    setSearchLocal(searchValue);
  }, [searchValue]);

  // debounce updating the URL param to reduce re-renders
  useEffect(() => {
    const t = setTimeout(() => {
      const params = { tab: "trending" };
      if (searchLocal && searchLocal.length > 0) params.q = searchLocal;
      setSearchParams(params);
    }, 350);
    return () => clearTimeout(t);
  }, [searchLocal, setSearchParams]);

  return (
    <Box
      sx={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        px: { xs: 3, sm: 4, md: 6 },
        py: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)"
      }}
    >
      <Link to="/blogs" style={{ display: "flex", alignItems: "center" }}>
        <img src={XLargeLogo} alt="XLarge" height={32} style={{ cursor: "pointer" }} />
      </Link>
      {showSearch && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, maxWidth: 600, mx: 2 }}>
          <SearchBar value={searchLocal} onChange={(v) => setSearchLocal(v)} />
          {searchValue ? <Chip label="Filtered" size="small" sx={{ bgcolor: "#eef2ff", color: "#4338ca" }} /> : null}
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2.5 } }}>
        <Button
          component={Link}
          to="/blogs"
          sx={{
            color: "#242424",
            textTransform: "none",
            fontSize: "15px",
            fontWeight: 500,
            px: 2,
            py: 1,
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            }
          }}
        >
          Home
        </Button>

        {auth && (
          <Button
            component={Link}
            to="/create"
            sx={{
              color: "#242424",
              textTransform: "none",
              fontSize: "15px",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              }
            }}
          >
            Write
          </Button>
        )}

        {!auth ? (
          <>
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "#242424",
                textTransform: "none",
                fontSize: "15px",
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                }
              }}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                backgroundColor: "#242424",
                color: "#ffffff",
                textTransform: "none",
                fontSize: "15px",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "20px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#000000",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }
              }}
            >
              Get started
            </Button>
          </>
        ) : (
          <Button
            onClick={handleLogout}
            sx={{
              color: "#6B6B6B",
              textTransform: "none",
              fontSize: "15px",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                color: "#242424",
              }
            }}
          >
            Sign out
          </Button>
        )}
      </Box>
    </Box>
  );
}
