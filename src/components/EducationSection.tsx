import { Box, Typography, Container, Card, CardContent, Grow, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import type { Education } from "../data/cvData";
import { useInView } from "../hooks/useInView";

interface Props {
  education: Education[];
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  const { ref, inView } = useInView(0.15);

  return (
    <Grow in={inView} timeout={600 + index * 200} ref={ref}>
      <Card>
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
            <Typography variant="h6">{edu.degree}</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.85rem",
              }}
            >
              {edu.period}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "secondary.main", fontWeight: 500, mb: 1 }}
          >
            {edu.school}
          </Typography>
          {edu.description && (
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
              {edu.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grow>
  );
}

export default function EducationSection({ education }: Props) {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <SchoolIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Utbildning
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
          {education.map((edu, i) => (
            <EducationCard key={i} edu={edu} index={i} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
