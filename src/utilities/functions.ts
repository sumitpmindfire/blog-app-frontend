const getFormattedDate = (date: Date) => {
  const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  });

  return formattedDate;
};

export { getFormattedDate };
