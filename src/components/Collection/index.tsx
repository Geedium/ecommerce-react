import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";

import Card from "../Card";

function Collection({ title, description }) {
  return (
    <>
      <Box className="collection">
        <Box sx={{ fontSize: 41, fontWeight: 300 }}>{title}</Box>
        <Box sx={{ fontSize: 21 }}>{description}</Box>
        <Button
          sx={{ zIndex: 99, position: "relative" }}
          color="primary"
          variant="contained"
        >
          Peržiūrėti
        </Button>
      </Box>
    </>
  );
}

export default Collection;
