export function generateTitle(filename: string): string {
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");

  const nameWithSpaces = nameWithoutExtension.replace(/[-_]/g, " ");

  const title = nameWithSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Remove caracteres especiais e números
  return title.replace(/[^a-zA-Z\s]/g, " ").trim();
}
