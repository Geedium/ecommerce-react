import {
  useMediaQuery,
  useTheme,
  Paper,
  Stack,
  Box,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { getSettings } from "../../store/slices/site";

import { motion } from "framer-motion";

import Section from "../Section";

function FooterSection(): JSX.Element {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const settings = useSelector(getSettings);

  const router = useRouter();

  const { locale } = router;

  const quoteText = settings?.footer_text?.[locale];

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        whiteSpace: "nowrap",
        flexBasis: 300,
        flexShrink: 0,
      }}
    >
      <video
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          userSelect: "none",
          pointerEvents: "none",
          objectFit: "cover",
          opacity: 0.8,
        }}
        muted
        loop
        autoPlay
      >
        <source src={settings.footer_video} type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#85776a",
          mixBlendMode: "color",
        }}
      />
      <Paper
        square={true}
        sx={{
          padding: 4,
          color: "#fff",
          background: "transparent",
          position: "relative",
          left: 0,
          top: 0,
          textAlign: "center",
          height: "100%",
        }}
      >
        <Stack
          sx={(theme) => ({
            flexGrow: 1,
            height: "100%",
            flexDirection: "column",
            [theme.breakpoints.up("md")]: {
              flexDirection: "row",
            },
          })}
          spacing={2}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotateZ(180deg)",
                display: "block",
              },
              display: "none",
              userSelect: "none",
              fontSize: 32,
            })}
          >
            Keyla
          </Box>
          <Divider
            sx={{
              [theme.breakpoints.down("md")]: {
                marginTop: "0 !important",
              },
            }}
            flexItem={true}
            orientation={isMediumScreen ? "vertical" : "horizontal"}
          />
          <Container
            sx={{
              m: "auto !important",
            }}
          >
            <Typography variant="h6" sx={{ mt: 2, flexShrink: 1, flexGrow: 1 }}>
              {`${quoteText}`}
            </Typography>
          </Container>
          <Divider
            flexItem={true}
            orientation={isMediumScreen ? "vertical" : "horizontal"}
          />
          <Box
            sx={{
              [theme.breakpoints.up("md")]: {
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                display: "block",
              },
              display: "none",
              userSelect: "none",
              fontSize: 32,
            }}
          >
            Estetique
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default FooterSection;
