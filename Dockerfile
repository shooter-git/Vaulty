# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Copy the start script to the /app directory
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Create data directory
RUN mkdir -p /app/data

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3010

# Define the command to run the app
CMD ["sh", "/app/start.sh"]
