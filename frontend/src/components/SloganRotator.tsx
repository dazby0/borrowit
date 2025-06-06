import { Typography, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SloganRotatorProps {
  slogans: string[];
  interval?: number;
}

const SloganRotator = ({ slogans, interval = 3000 }: SloganRotatorProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slogans.length);
    }, interval);
    return () => clearInterval(id);
  }, [slogans, interval]);

  return (
    <Box
      height={32}
      mb={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {slogans[index]}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default SloganRotator;
