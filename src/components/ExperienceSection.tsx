import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Chip,
  Stack,
  Grow,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import type { Experience } from "../data/cvData";
import { useInView } from "../hooks/useInView";

interface Props {
  experience: Experience[];
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const { ref, inView } = useInView(0.15);

  return (
    <Grow in={inView} timeout={600 + index * 200} ref={ref}>
      <Card
        sx={{
          position: "relative",
          pl: { xs: 0, md: 2 },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: "linear-gradient(180deg, #64ffda, #7c4dff)",
            borderRadius: 2,
          },
        }}
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
              {exp.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.85rem",
              }}
            >
              {exp.period}
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ color: "secondary.main", fontWeight: 500, mb: 1.5 }}
          >
            {exp.company}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2 }}
          >
            {exp.description}
          </Typography>

          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {exp.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "rgba(100, 255, 218, 0.3)",
                  color: "primary.main",
                  fontSize: "0.75rem",
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grow>
  );
}

export default function ExperienceSection({ experience }: Props) {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <WorkIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Erfarenhet
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
          {experience.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
