/**
 * Formate un nombre en devise (FCFA ou autre monnaie locale)
 * @param {number} value - Valeur numérique à formater
 * @returns {string} - Chaîne formatée (ex: "1 000 000 FCFA")
 */
export function formatCurrency(value) {
  if (value === undefined || value === null) return "0 FCFA";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF", // FCFA (Franc CFA)
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  .format(value)
  .replace("FCFA", "FCFA")
  .trim();
}

/**
 * Formate une date en format lisible (ex: "05 août 2025")
 * @param {string|Date} date - Date à formater (ISO string ou objet Date)
 * @returns {string} - Chaîne formatée
 */
export function formatDate(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Formate un ratio ou pourcentage (ex: 0.3 → "30%")
 * @param {number} value - Valeur numérique (ex: 0.3)
 * @returns {string} - Chaîne formatée (ex: "30%")
 */
export function formatPercentage(value) {
  if (value === undefined || value === null) return "0%";
  return `${Math.round(value * 100)}%`;
}

/**
 * Formate un nombre avec séparateurs de milliers (ex: 1000000 → "1 000 000")
 * @param {number} value - Valeur numérique
 * @returns {string} - Chaîne formatée
 */
export function formatNumber(value) {
  if (value === undefined || value === null) return "0";
  return new Intl.NumberFormat("fr-FR").format(value);
}

/**
 * Formate un booléen en "Oui/Non" pour l'affichage
 * @param {boolean} value - Valeur booléenne
 * @returns {string} - "Oui" ou "Non"
 */
export function formatBoolean(value) {
  return value ? "Oui" : "Non";
}

/**
 * Formate une liste de chaînes en une phrase lisible (ex: ["ODD 8", "ODD 12"] → "ODD 8, ODD 12")
 * @param {string|Array} items - Liste d'items (string ou tableau)
 * @returns {string} - Chaîne formatée
 */
export function formatList(items) {
  if (!items) return "Aucun";
  if (typeof items === "string") return items;
  return items.join(", ");
}

/**
 * Formate un statut légal en version longue (ex: "SARL" → "Société à Responsabilité Limitée")
 * @param {string} statut - Code du statut (ex: "SARL")
 * @returns {string} - Version longue
 */
export function formatStatutLegal(statut) {
  const statuts = {
    SARL: "Société à Responsabilité Limitée",
    SA: "Société Anonyme",
    "Auto-entrepreneur": "Auto-entrepreneur",
  };
  return statuts[statut] || statut;
}
