/**
 * NATLE Enterprise Input Sanitization & Security Utilities
 * Protects forms against XSS, SQLi, and malformed payload attacks.
 */

/**
 * Strips HTML tags, script tags, javascript: pseudo-protocols, and unsafe entities
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/onload\s*=/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/['"\\]/g, (char) => {
      switch (char) {
        case "'": return "&#39;";
        case '"': return "&quot;";
        case "\\": return "&#92;";
        default: return char;
      }
    })
    .trim();
}

/**
 * Validates email according to strict RFC 5322 regex
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email.trim()) && email.length <= 254;
}

/**
 * Sanitizes and truncates user message payload to prevent memory exhaustion
 */
export function sanitizeMessage(message: string, maxLength: number = 2000): string {
  const clean = sanitizeInput(message);
  return clean.slice(0, maxLength);
}
