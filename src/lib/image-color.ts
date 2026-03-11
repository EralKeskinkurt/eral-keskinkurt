import sharp from "sharp";

const colorCache = new Map<string, { value: string; expiresAt: number }>();
const CACHE_TTL_MS = 1000 * 60 * 30;

function rgbToCss(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

function boostColor(r: number, g: number, b: number) {
  const avg = (r + g + b) / 3;
  const lift = avg < 95 ? 32 : 0;

  return {
    r: Math.min(255, r + lift),
    g: Math.min(255, g + lift),
    b: Math.min(255, b + lift),
  };
}

export async function getAverageImageColor(imageUrl: string | null | undefined) {
  if (!imageUrl) return null;

  const now = Date.now();
  const cached = colorCache.get(imageUrl);
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const imageResponse = await fetch(imageUrl, { cache: "force-cache" });
  if (!imageResponse.ok) return null;

  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data } = await sharp(buffer)
    .resize(1, 1, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const r = data[0] ?? 218;
  const g = data[1] ?? 0;
  const b = data[2] ?? 55;
  const boosted = boostColor(r, g, b);
  const color = rgbToCss(boosted.r, boosted.g, boosted.b);

  colorCache.set(imageUrl, { value: color, expiresAt: now + CACHE_TTL_MS });
  return color;
}
