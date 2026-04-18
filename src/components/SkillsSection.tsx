import {
  Box,
  Typography,
  Container,
  Grid,
  Chip,
  Fade,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import type { Skill } from "../data/cvData";
import { useInView } from "../hooks/useInView";

interface Props {
  skills: Skill[];
}

function SkillCategory({ category, skills }: { category: string; skills: Skill[] }) {
  const { ref, inView } = useInView(0.1);

  return (
    <Box ref={ref}>
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          mb: 2,
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {category}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {skills.map((skill, i) => (
          <Fade key={skill.name} in={inView} timeout={400 + i * 100}>
            <Chip
              label={skill.name}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "rgba(100, 255, 218, 0.3)",
                color: "primary.main",
                fontSize: "0.75rem",
              }}
            />
          </Fade>
        ))}
      </Box>
    </Box>
  );
}

export default function SkillsSection({ skills }: Props) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <Box sx={{ py: 10, background: "rgba(17, 34, 64, 0.4)" }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <CodeIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Kompetenser
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

        <Grid container spacing={4}>
          {categories.map((cat) => (
            <Grid size={{ xs: 12, md: 6 }} key={cat}>
              <SkillCategory
                category={cat}
                skills={skills.filter((s) => s.category === cat)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
