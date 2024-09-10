# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install dos2unix to handle line endings conversion
RUN apk add --no-cache dos2unix

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Create data directory
RUN mkdir -p /app/data

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3010

# Copy the start script and set permissions
COPY start.sh /app/start.sh
RUN dos2unix /app/start.sh && chmod +x /app/start.sh

# Use shell form to ensure the script is executed by /bin/sh
CMD ["/bin/sh", "/app/start.sh"]
