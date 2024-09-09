#!/bin/sh

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Error: .env.local file not found. Please ensure it exists in the project root."
    exit 1
fi

# Initialize the database
node scripts/db-init.js

# Update the database schema
node scripts/update-schema.js

# Start the application
npm start