import {
  Box,
  Typography,
  Container,
  LinearProgress,
  Grid,
  Fade,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import type { Skill } from "../data/cvData";
import { useInView } from "../hooks/useInView";

interface Props {
  skills: Skill[];
}

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <Box ref={ref} sx={{ mb: 2.5 }}>
      <Fade in={inView} timeout={600 + delay}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {skill.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontFamily: "'Fira Code', monospace", fontSize: "0.8rem" }}
            >
              {skill.level}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={inView ? skill.level : 0}
            sx={{
              "& .MuiLinearProgress-bar": {
                transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                background: `linear-gradient(90deg, #64ffda ${100 - skill.level}%, #7c4dff 100%)`,
              },
            }}
          />
        </Box>
      </Fade>
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
                {cat}
              </Typography>
              {skills
                .filter((s) => s.category === cat)
                .map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} delay={i * 100} />
                ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
