import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Stack,
  Grow,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import type { BlogPost } from "../utils/markdown";
import { useInView } from "../hooks/useInView";

interface Props {
  posts: BlogPost[];
}

function PreviewCard({ post, index }: { post: BlogPost; index: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <Grow in={inView} timeout={600 + index * 150} ref={ref}>
      <Card sx={{ flex: 1, minWidth: 0 }}>
        <CardActionArea
          component={Link}
          to={`/blog/${post.slug}`}
          sx={{ height: "100%", textDecoration: "none" }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.8rem",
                mb: 1,
              }}
            >
              {post.date}
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary", mb: 1, fontSize: "1rem" }}>
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.summary}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
}

export default function BlogPreview({ posts }: Props) {
  const latest = posts.slice(0, 3);

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <ArticleIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Senaste inläggen
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(100,255,218,0.3), transparent)",
              ml: 2,
            }}
          />
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
          {latest.map((post, i) => (
            <PreviewCard key={post.slug} post={post} index={i} />
          ))}
        </Stack>

        <Box sx={{ textAlign: "center" }}>
          <Button
            component={Link}
            to="/blog"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: "primary.main",
              borderColor: "rgba(100, 255, 218, 0.4)",
              textTransform: "none",
              fontSize: "0.95rem",
              "&:hover": {
                borderColor: "primary.main",
                background: "rgba(100, 255, 218, 0.05)",
              },
            }}
            variant="outlined"
          >
            Alla inlägg
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
