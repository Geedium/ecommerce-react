import styles from "./Section.module.css";
import { motion, useViewportScroll, useTransform } from "framer-motion";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

interface SectionProps {
  children?: any;
  id: number;
  block?: boolean;
  expand?: boolean;
  sx?: any;
}

export default function Section({
  children,
  expand,
  id,
  block,
  sx,
}: SectionProps) {
  return (
    <Box
      sx={sx}
      className={`${styles.section} ${
        !sx && (id % 2 == 0 ? styles.one : styles.two)
      } ${expand && styles.expand} ${block ? styles.block : ""}`}
    >
      {/* <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div> */}
      {children}
    </Box>
  );
}

Section.propTypes = {
  children: PropTypes.any,
  id: PropTypes.number.isRequired,
};
