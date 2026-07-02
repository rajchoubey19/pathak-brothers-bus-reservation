export const formatDate = (date) => {
  if (!date) return "N/A";

  if (typeof date === "string" && date.includes("-")) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  return date;
};