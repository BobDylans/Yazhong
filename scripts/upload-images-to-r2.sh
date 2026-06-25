#!/bin/bash
# Upload images to Cloudflare R2 bucket
set -e

BUCKET="yazhong-images"
IMG_DIR="public/images"
DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== Uploading to R2 bucket: $BUCKET ==="
echo ""

cd "$DIR"

for file in "$IMG_DIR"/*.webp "$IMG_DIR"/*.jpg "$IMG_DIR"/*.png; do
  [ -f "$file" ] || continue
  name=$(basename "$file")
  size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
  echo "  Uploading: $name ($((size/1024))KB)..."
  npx wrangler r2 object put "$BUCKET/$name" --file="$file" --ct "image/$(echo "$name" | grep -oP 'jpg|png|webp')" 2>&1 | tail -1
done

echo ""
echo "=== All uploaded! ==="
echo ""
echo "Images in bucket:"
npx wrangler r2 object list "$BUCKET" 2>&1 | head -20
