export function hexToInt(hex: string): number {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  return parseInt(hex, 16) || 0;
}
