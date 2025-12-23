import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/authUtil";
import XLargeLogo from "../assets/XLargeLogo.svg";

export default function Navbar() {
  const auth = isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
