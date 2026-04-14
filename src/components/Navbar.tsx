import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sectionItems = [
  { label: "Erfarenhet", id: "experience" },
  { label: "Kompetenser", id: "skills" },
  { label: "Utbildning", id: "education" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setDrawerOpen(false);
  };

  const goHome = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? "rgba(10, 25, 47, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(100, 255, 218, 0.1)"
            : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: "pointer",
              background: "linear-gradient(135deg, #64ffda, #7c4dff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={goHome}
          >
            PB
          </Typography>

          {isMobile ? (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: "primary.main" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              {sectionItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{
                    color: "text.secondary",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: "primary.main",
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.8rem",
                      mr: 0.5,
                    }}
                  >
                    /
                  </Box>
                  {item.label}
                </Button>
              ))}
              <Button
                component={Link}
                to="/blog"
                sx={{
                  color: location.pathname.startsWith("/blog")
                    ? "primary.main"
                    : "text.secondary",
                  textTransform: "none",
                  fontSize: "0.9rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "0.8rem",
                    mr: 0.5,
                  }}
                >
                  /
                </Box>
                Blogg
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              background: "rgba(10, 25, 47, 0.95)",
              backdropFilter: "blur(10px)",
              width: 240,
            },
          },
        }}
      >
        <List sx={{ mt: 4 }}>
          {sectionItems.map((item) => (
            <ListItemButton key={item.id} onClick={() => scrollTo(item.id)}>
              <ListItemText
                primary={item.label}
                sx={{ "& .MuiTypography-root": { color: "text.secondary" } }}
              />
            </ListItemButton>
          ))}
          <ListItemButton
            component={Link}
            to="/blog"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText
              primary="Blogg"
              sx={{ "& .MuiTypography-root": { color: "text.secondary" } }}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
