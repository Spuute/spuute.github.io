import { Box, Typography, Container, IconButton, Stack, Fade } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { CvData } from "../data/cvData";

interface HeroProps {
  data: CvData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse 80% 80% at 42% 45%, rgba(100,255,218,0.07) 0%, rgba(124,77,255,0.03) 40%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                fontFamily: "'Fira Code', monospace",
                mb: 2,
                fontSize: "1rem",
              }}
            >
              Hej, mitt namn är
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                mb: 1,
                background: "linear-gradient(135deg, #ccd6f6 30%, #64ffda 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {data.name}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                color: "text.secondary",
                mb: 3,
              }}
            >
              {data.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 540,
                color: "text.secondary",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              {data.summary}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <IconButton
                href={`mailto:${data.contact.email}`}
                sx={{ color: "primary.main" }}
                aria-label="Email"
              >
                <EmailIcon />
              </IconButton>
              <IconButton
                href={`https://${data.contact.linkedin}`}
                target="_blank"
                sx={{ color: "primary.main" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href={`https://${data.contact.github}`}
                target="_blank"
                sx={{ color: "primary.main" }}
                aria-label="GitHub"
              >
                <GitHubIcon />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.secondary",
                  ml: 2,
                }}
              >
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">{data.contact.location}</Typography>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
