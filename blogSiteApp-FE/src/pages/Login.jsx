import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";

export default function Login() {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await login(form);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "calc(100vh - 80px)", 
      display: "flex", 
      alignItems: "center", 
      backgroundColor: "#fafafa",
      py: 8
    }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            p: { xs: 4, sm: 6 },
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
            border: "1px solid rgba(0, 0, 0, 0.06)"
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "32px", sm: "40px" },
              color: "#242424",
              mb: 1,
              letterSpacing: "-0.02em"
            }}
          >
            Welcome back
          </Typography>
          <Typography sx={{ color: "#6B6B6B", fontSize: "16px", mb: 4 }}>
            Sign in to continue to your account
          </Typography>

          {error && (
            <Box
              sx={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                p: 2,
                mb: 3
              }}
            >
              <Typography sx={{ color: "#dc2626", fontSize: "14px" }}>
                {error}
              </Typography>
            </Box>
          )}

          <Box component="form" onSubmit={submit} display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Username"
              value={form.userName}
              onChange={e => setForm({ ...form, userName: e.target.value })}
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "#fafafa",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#242424",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#242424",
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "#fafafa",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#242424",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#242424",
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#9CA3AF" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#242424",
                color: "#ffffff",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
                py: 1.5,
                borderRadius: "10px",
                boxShadow: "none",
                mt: 1,
                "&:hover": {
                  backgroundColor: "#000000",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
                "&:disabled": {
                  backgroundColor: "#9CA3AF",
                }
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ color: "#6B6B6B", fontSize: "15px" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#242424",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
