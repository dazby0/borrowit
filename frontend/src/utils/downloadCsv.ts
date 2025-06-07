export const downloadCsv = async (url: string, filename: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to download CSV");

  const blob = await res.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
