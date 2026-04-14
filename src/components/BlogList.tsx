import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Stack,
  Grow,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import type { BlogPost } from "../utils/markdown";
import { useInView } from "../hooks/useInView";

interface Props {
  posts: BlogPost[];
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <Grow in={inView} timeout={600 + index * 150} ref={ref}>
      <Card>
        <CardActionArea
          component={Link}
          to={`/blog/${post.slug}`}
          sx={{ textDecoration: "none" }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                mb: 1,
              }}
            >
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
              >
                {post.date}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2 }}
            >
              {post.summary}
            </Typography>

            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
}

export default function BlogList({ posts }: Props) {
  return (
    <Box sx={{ pt: 12, pb: 10, minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Link
            to="/"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <ArrowBackIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: "primary.main" }}>
              Tillbaka till CV
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <ArticleIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Blogg
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

        <Stack spacing={3}>
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
