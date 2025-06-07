import { Button } from "@mui/material";

interface ExportCsvButtonProps {
  apiUrl: string;
  fileName: string;
}

const ExportCsvButton = ({ apiUrl, fileName }: ExportCsvButtonProps) => {
  const api = `http://localhost:5127/api/${apiUrl}/export`;
  const handleExport = () => {
    import("../utils/downloadCsv").then(({ downloadCsv }) => {
      downloadCsv(api, fileName);
    });
  };

  return (
    <Button variant="outlined" onClick={handleExport} sx={{ mb: 2 }}>
      Export to CSV
    </Button>
  );
};

export default ExportCsvButton;
