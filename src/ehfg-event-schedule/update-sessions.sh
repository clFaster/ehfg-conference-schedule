#!/bin/bash

# Bash script to download programme.json from EHFG website
# and save it as sessions.json in the public directory

URL="https://www.ehfg.org/programme.json"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_PATH="$SCRIPT_DIR/public/sessions.json"

echo "Downloading programme data from $URL..."

# Create public directory if it doesn't exist
PUBLIC_DIR="$SCRIPT_DIR/public"
if [ ! -d "$PUBLIC_DIR" ]; then
    mkdir -p "$PUBLIC_DIR"
    echo "Created public directory: $PUBLIC_DIR"
fi

# Download the file using curl
if curl -L -o "$OUTPUT_PATH" "$URL"; then
    echo "Successfully downloaded programme data to: $OUTPUT_PATH"
    
    # Display file size
    if [ -f "$OUTPUT_PATH" ]; then
        FILE_SIZE=$(wc -c < "$OUTPUT_PATH")
        echo "File size: $FILE_SIZE bytes"
    fi
else
    echo "Error: Failed to download programme data" >&2
    exit 1
fi