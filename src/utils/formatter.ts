// src/utils/formatter.ts

export function formatCurrency(value: number | string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
  }).format(Number(value));
}

export function formatDate(date: string | Date | any): string {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatNumber(value: number | string): string {
  return new Intl.NumberFormat("fr-FR").format(Number(value));
}

export function formatPhone(value: string): string {
  return value.replace(/(\+242)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
}

export function formatStatut(statut: "SARL" | "SA" | "Auto-entrepreneur"): string {
  const map: Record<typeof statut, string> = {
    SARL: "Société à Responsabilité Limitée",
    SA: "Société Anonyme",
    "Auto-entrepreneur": "Auto-entrepreneur",
  };
  return map[statut];
}
