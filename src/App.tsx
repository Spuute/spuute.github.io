import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import theme from "./theme/theme";
import cvData from "./data/cvData";
import { loadBlogPosts } from "./utils/markdown";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import BlogPreview from "./components/BlogPreview";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import PdfExport from "./components/PdfExport";

const posts = loadBlogPosts();

function CvPage() {
  return (
    <>
      <Hero data={cvData} />
      <Box id="experience">
        <ExperienceSection experience={cvData.experience} />
      </Box>
      <Box id="skills">
        <SkillsSection skills={cvData.skills} />
      </Box>
      <Box id="education">
        <EducationSection education={cvData.education} />
      </Box>
      <Box id="blog">
        <BlogPreview posts={posts} />
      </Box>
      <PdfExport data={cvData} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<CvPage />} />
        <Route path="/blog" element={<BlogList posts={posts} />} />
        <Route path="/blog/:slug" element={<BlogPost posts={posts} />} />
      </Routes>
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 4,
          color: "text.secondary",
          fontSize: "0.85rem",
          borderTop: "1px solid rgba(100, 255, 218, 0.1)",
        }}
      >
        Byggt med React, TypeScript & Material UI
      </Box>
    </ThemeProvider>
  );
}

export default App;
