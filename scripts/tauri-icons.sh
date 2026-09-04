#!/bin/bash
# inkscape imagemagick libicns

# Exit immediately if a command exits with a non-zero status
set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <path-to-svg> [output-directory]"
    exit 1
fi

SVG_FILE="$1"
OUTPUT_DIR="${2:-./PWA/OpsmanagerApp/src-tauri/icons}"

if [ ! -f "$SVG_FILE" ]; then
    echo "Error: File '$SVG_FILE' not found!"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check required commands
for cmd in inkscape magick png2icns; do
    if ! command -v "$cmd" &> /dev/null; then
        echo "Error: Required tool '$cmd' is not installed."
        echo "Install inkscape imagemagick and libicns"
        exit 1
    fi
done

echo "==> Rendering assets from $SVG_FILE into '$OUTPUT_DIR'..."

# Helper function to export a specific size using Inkscape CLI
render_png() {
    local size="$1"
    local output="$OUTPUT_DIR/$2"
    inkscape --export-filename="$output" --export-width="$size" --export-height="$size" "$SVG_FILE" > /dev/null 2>&1
}

# 1. Standard & High-DPI PNGs
render_png 256 "128x128@2x.png"
render_png 128 "128x128.png"
render_png 32  "32x32.png"
render_png 512 "icon.png"

# 2. Windows UWP / MSIX Logo Sizes
render_png 30  "Square30x30Logo.png"
render_png 44  "Square44x44Logo.png"
render_png 71  "Square71x71Logo.png"
render_png 89  "Square89x89Logo.png"
render_png 107 "Square107x107Logo.png"
render_png 142 "Square142x142Logo.png"
render_png 150 "Square150x150Logo.png"
render_png 284 "Square284x284Logo.png"
render_png 310 "Square310x310Logo.png"
render_png 50  "StoreLogo.png"

# 3. Temporary directory for multi-resolution containers
TMP_DIR=$(mktemp -d)
inkscape --export-filename="$TMP_DIR/16.png" --export-width=16 --export-height=16 "$SVG_FILE" > /dev/null 2>&1
inkscape --export-filename="$TMP_DIR/32.png" --export-width=32 --export-height=32 "$SVG_FILE" > /dev/null 2>&1
inkscape --export-filename="$TMP_DIR/48.png" --export-width=48 --export-height=48 "$SVG_FILE" > /dev/null 2>&1
inkscape --export-filename="$TMP_DIR/64.png" --export-width=64 --export-height=64 "$SVG_FILE" > /dev/null 2>&1
inkscape --export-filename="$TMP_DIR/128.png" --export-width=128 --export-height=128 "$SVG_FILE" > /dev/null 2>&1
inkscape --export-filename="$TMP_DIR/256.png" --export-width=256 --export-height=256 "$SVG_FILE" > /dev/null 2>&1
inkscape --export-filename="$TMP_DIR/512.png" --export-width=512 --export-height=512 "$SVG_FILE" > /dev/null 2>&1
inkscape --export-filename="$TMP_DIR/1024.png" --export-width=1024 --export-height=1024 "$SVG_FILE" > /dev/null 2>&1

# 4. Generate icon.ico (Windows)
echo "==> Generating icon.ico..."
magick "$TMP_DIR/16.png" "$TMP_DIR/32.png" "$TMP_DIR/48.png" "$TMP_DIR/64.png" "$TMP_DIR/128.png" "$TMP_DIR/256.png" "$OUTPUT_DIR/icon.ico"

# 5. Generate icon.icns (macOS)
echo "==> Generating icon.icns..."
png2icns "$OUTPUT_DIR/icon.icns" "$TMP_DIR/16.png" "$TMP_DIR/32.png" "$TMP_DIR/64.png" "$TMP_DIR/128.png" "$TMP_DIR/256.png" "$TMP_DIR/512.png" "$TMP_DIR/1024.png"

# Clean up temp files
rm -rf "$TMP_DIR"

# Copy favicon to public folder
PUBLIC_DIR="./PWA/OpsmanagerApp/public"
mkdir -p "$PUBLIC_DIR"
cp "$SVG_FILE" "$PUBLIC_DIR/favicon.svg"

echo "==> All assets generated successfully in '$OUTPUT_DIR' and favicon copied to '$PUBLIC_DIR'!"