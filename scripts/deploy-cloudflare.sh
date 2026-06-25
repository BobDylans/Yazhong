#!/bin/bash
# ============================================================
# Deploy to Cloudflare Pages + R2 image storage
# Prerequisites:
#   1. npx wrangler login
#   2. npx wrangler r2 bucket create carfurnisher-images
# ============================================================
set -e

echo "=== Step 1: Build static site ==="
npm run build

echo ""
echo "=== Step 2: Upload images to R2 ==="
echo "Uploading images to carfurnisher-images bucket..."
for img in public/images/*.webp public/images/*.jpg public/images/*.png; do
  [ -f "$img" ] || continue
  name=$(basename "$img")
  echo "  Uploading $name..."
  npx wrangler r2 object put "carfurnisher-images/$name" --file="$img" --quiet 2>/dev/null || echo "  ! Failed: $name (run 'npx wrangler login' first)"
done

echo ""
echo "=== Step 3: Deploy to Cloudflare Pages ==="
echo "Creating project 'carfurnisher' if needed..."
npx wrangler pages project create carfurnisher --production-branch main 2>/dev/null || true

echo "Deploying..."
npx wrangler pages deploy out/ --project-name=carfurnisher --branch=main

echo ""
echo "=== Done! ==="
echo "Your site is live at: https://carfurnisher.pages.dev"
echo "Custom domain: configure in Cloudflare Dashboard > Workers & Pages > carfurnisher"
