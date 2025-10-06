export function convertDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = parseInt(hours) >= 12 ? "pm" : "am";
  const formattedHours = parseInt(hours) % 12 || 12;
  return `${year}/${month}/${day} ${formattedHours}:${minutes} ${ampm}`;
}
