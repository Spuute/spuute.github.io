import { useRef, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  Fab,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import type { CvData } from "../data/cvData";

interface Props {
  data: CvData;
}

function PdfContent({ data, innerRef }: { data: CvData; innerRef: React.Ref<HTMLDivElement> }) {
  const categories = [...new Set(data.skills.map((s) => s.category))];

  return (
    <Box
      ref={innerRef}
      sx={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        width: "794px", // A4 width at 96 DPI
        background: "#0a192f",
        color: "#ccd6f6",
        fontFamily: "'Inter', sans-serif",
        p: 5,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#64ffda",
            mb: 0.5,
            lineHeight: 1.2,
          }}
        >
          {data.name}
        </Typography>
        <Typography sx={{ fontSize: "1.3rem", color: "#8892b0", mb: 2 }}>
          {data.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
          {[
            data.contact.email,
            data.contact.phone,
            data.contact.location,
            data.contact.linkedin,
          ].map((item) => (
            <Typography key={item} sx={{ fontSize: "0.8rem", color: "#8892b0" }}>
              {item}
            </Typography>
          ))}
        </Box>
        <Box sx={{ height: "2px", background: "linear-gradient(90deg, #64ffda, #7c4dff, transparent)" }} />
      </Box>

      {/* Summary */}
      <Typography sx={{ fontSize: "0.95rem", color: "#8892b0", lineHeight: 1.7, mb: 4 }}>
        {data.summary}
      </Typography>

      {/* Experience */}
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#ccd6f6", mb: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Erfarenhet
      </Typography>
      {data.experience.map((exp, i) => (
        <Box key={i} sx={{ mb: 3, pl: 2, borderLeft: "2px solid rgba(100,255,218,0.3)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#ccd6f6" }}>
              {exp.title}
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "#64ffda", fontFamily: "'Fira Code', monospace" }}>
              {exp.period}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "0.9rem", color: "#7c4dff", fontWeight: 500, mb: 0.5 }}>
            {exp.company}
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", color: "#8892b0", lineHeight: 1.6, mb: 1 }}>
            {exp.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {exp.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  maxWidth: "none",
                  background: "rgba(100,255,218,0.08)",
                  color: "#64ffda",
                  border: "1px solid rgba(100,255,218,0.2)",
                  "& .MuiChip-label": {
                    overflow: "visible",
                    textOverflow: "unset",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      ))}

      {/* Education */}
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#ccd6f6", mb: 2, mt: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Utbildning
      </Typography>
      {data.education.map((edu, i) => (
        <Box key={i} sx={{ mb: 2, pl: 2, borderLeft: "2px solid rgba(124,77,255,0.3)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#ccd6f6" }}>
              {edu.degree}
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "#64ffda", fontFamily: "'Fira Code', monospace" }}>
              {edu.period}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "0.9rem", color: "#7c4dff", fontWeight: 500 }}>
            {edu.school}
          </Typography>
          {edu.description && (
            <Typography sx={{ fontSize: "0.85rem", color: "#8892b0", mt: 0.5 }}>
              {edu.description}
            </Typography>
          )}
        </Box>
      ))}

      {/* Skills */}
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#ccd6f6", mb: 2, mt: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Kompetenser
      </Typography>
      <Box sx={{ display: "flex", gap: 4 }}>
        {categories.map((cat) => (
          <Box key={cat} sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "0.8rem", color: "#7c4dff", textTransform: "uppercase", letterSpacing: "0.08em", mb: 1, fontWeight: 600 }}>
              {cat}
            </Typography>
            {data.skills
              .filter((s) => s.category === cat)
              .map((skill) => (
                <Box key={skill.name} sx={{ mb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.3 }}>
                    <Typography sx={{ fontSize: "0.8rem", color: "#ccd6f6" }}>
                      {skill.name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "#8892b0" }}>
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgba(100,255,218,0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 2,
                        background: `linear-gradient(90deg, #64ffda, #7c4dff)`,
                      },
                    }}
                  />
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function PdfExport({ data }: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleExport = async () => {
    if (!pdfRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a192f",
      });

      const imgWidth = 210; // A4 mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");
      const pageHeight = 297;

      let position = 0;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        if (position > 0) pdf.addPage();
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          -position,
          imgWidth,
          imgHeight
        );
        remainingHeight -= pageHeight;
        position += pageHeight;
      }

      pdf.save(`${data.name.replace(/\s+/g, "_")}_CV.pdf`);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PdfContent data={data} innerRef={pdfRef} />
      <Fab
        onClick={handleExport}
        disabled={loading}
        aria-label="Ladda ner CV som PDF"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          background: "linear-gradient(135deg, #64ffda, #7c4dff)",
          color: "#0a192f",
          "&:hover": {
            background: "linear-gradient(135deg, #9effff, #b47cff)",
          },
          "&.Mui-disabled": {
            background: "rgba(100,255,218,0.3)",
          },
          zIndex: 1200,
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#0a192f" }} /> : <DownloadIcon />}
      </Fab>
      <Snackbar open={error} autoHideDuration={4000} onClose={() => setError(false)}>
        <Alert severity="error" onClose={() => setError(false)}>
          Kunde inte generera PDF. Försök igen.
        </Alert>
      </Snackbar>
    </>
  );
}
