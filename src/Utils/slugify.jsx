export function slugify(title, maxLen = 80) {
  return title
    .toString()
    .normalize("NFKD")                 // remove accents
    .replace(/[\u0300-\u036f]/g, "")   // diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")      // non-alnum -> dash
    .replace(/^-+|-+$/g, "")           // trim dashes
    .slice(0, maxLen);
}
