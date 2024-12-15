export const getYearFromUTC = (utc: string) =>
  new Date(utc).getFullYear() || "-";

export const getDateFromUTC = (utc: string) => {
  const date = new Date(utc);
  const year = date.getFullYear();
  const month = date.getMonth().toLocaleString("en-US").padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getScreenTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};
