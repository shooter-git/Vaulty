# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
# Use npm install instead of npm ci to avoid deprecation warnings
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the new port the app runs on
EXPOSE 3010

# Create a startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Define the command to run the app
CMD ["/start.sh"]