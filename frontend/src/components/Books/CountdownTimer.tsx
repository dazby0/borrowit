import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface Props {
  endDate: string;
}

const CountdownTimer = ({ endDate }: Props) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (isNaN(end.getTime())) return "Invalid date";

    if (diff <= 0) return "Book is available";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 30000); // co 30s

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <Typography variant="body2" color="text.secondary" mt={2}>
      Book available in: {timeLeft}
    </Typography>
  );
};

export default CountdownTimer;
