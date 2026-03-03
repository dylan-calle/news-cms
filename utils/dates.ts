export function formatSpanishDate(dateString: string) {
  const [year, month, day] = dateString.split("-");

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const monthIndex = parseInt(month, 10) - 1;

  const dayNumber = parseInt(day, 10);

  return `${dayNumber} de ${months[monthIndex]} del ${year}`;
}
