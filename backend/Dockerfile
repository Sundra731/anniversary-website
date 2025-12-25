# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./
COPY backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY backend/ .

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]