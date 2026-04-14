import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64ffda",
      light: "#9effff",
      dark: "#14cba8",
    },
    secondary: {
      main: "#7c4dff",
      light: "#b47cff",
      dark: "#3f1dcb",
    },
    background: {
      default: "#0a192f",
      paper: "#112240",
    },
    text: {
      primary: "#ccd6f6",
      secondary: "#8892b0",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
          border: "1px solid rgba(100, 255, 218, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 40px rgba(100, 255, 218, 0.08)",
            borderColor: "rgba(100, 255, 218, 0.3)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
          backgroundColor: "rgba(100, 255, 218, 0.08)",
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
