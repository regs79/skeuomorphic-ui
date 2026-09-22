/** Black or white, whichever reads on the given hex. Derived at render; never store it. */
export function readableOn(hex: string): '#000000' | '#ffffff' {
  return luminance(hex) > 0.4 ? '#000000' : '#ffffff';
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch((n >> 16) & 255) + 0.7152 * ch((n >> 8) & 255) + 0.0722 * ch(n & 255);
}
