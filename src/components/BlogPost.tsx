import { Box, Typography, Container, Chip, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams, Navigate } from "react-router-dom";
import type { BlogPost as BlogPostType } from "../utils/markdown";
import "highlight.js/styles/github-dark.css";

interface Props {
  posts: BlogPostType[];
}

export default function BlogPost({ posts }: Props) {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <Box sx={{ pt: 12, pb: 10, minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Link
            to="/blog"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ArrowBackIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: "primary.main" }}>
              Alla inlägg
            </Typography>
          </Link>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            fontFamily: "'Fira Code', monospace",
            mb: 1,
          }}
        >
          {post.date}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.75rem", sm: "2.25rem" },
          }}
        >
          {post.title}
        </Typography>

        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 5 }}>
          {post.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "rgba(124, 77, 255, 0.3)",
                color: "secondary.main",
                fontSize: "0.75rem",
              }}
            />
          ))}
        </Stack>

        <Box
          sx={{
            "& h1": {
              display: "none",
            },
            "& h2": {
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "text.primary",
              mt: 5,
              mb: 2,
            },
            "& h3": {
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "text.primary",
              mt: 4,
              mb: 1.5,
            },
            "& p": {
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 2,
              fontSize: "1.05rem",
            },
            "& ul, & ol": {
              color: "text.secondary",
              pl: 3,
              mb: 2,
              "& li": {
                mb: 0.5,
                lineHeight: 1.7,
              },
            },
            "& strong": {
              color: "text.primary",
              fontWeight: 600,
            },
            "& a": {
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            "& pre": {
              borderRadius: 3,
              p: 2.5,
              mb: 3,
              overflow: "auto",
              background: "rgba(17, 34, 64, 0.8) !important",
              border: "1px solid rgba(100, 255, 218, 0.1)",
              fontSize: "0.9rem",
            },
            "& code:not(pre code)": {
              background: "rgba(100, 255, 218, 0.08)",
              color: "primary.main",
              px: 0.8,
              py: 0.2,
              borderRadius: 1,
              fontSize: "0.9em",
              fontFamily: "'Fira Code', monospace",
            },
            "& blockquote": {
              borderLeft: "3px solid",
              borderColor: "primary.main",
              pl: 2,
              ml: 0,
              my: 3,
              "& p": {
                color: "text.secondary",
                fontStyle: "italic",
              },
            },
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>
    </Box>
  );
}
