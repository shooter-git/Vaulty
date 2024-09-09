#!/bin/sh

# Make the script executable on Unix-based systems, WSL, and other compatible environments
# Use POSIX-compliant shell syntax

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Error: .env.local file not found. Please ensure it exists in the project root."
    exit 1
fi

# Initialize the database
if ! node scripts/db-init.js; then
    echo "Error: Failed to initialize the database."
    exit 1
fi

# Update the database schema
if ! node scripts/update-schema.js; then
    echo "Error: Failed to update the database schema."
    exit 1
fi

# Start the application
if ! npm start; then
    echo "Error: Failed to start the application."
    exit 1
fi