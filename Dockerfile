# Specify the base image with Node.js, version 20, and Alpine Linux 3.18
FROM node:20-alpine3.18

# Install Yarn package manager without caching and dependencies
RUN apk add --no-cache yarn

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the application files into the container's working directory
COPY . .

# Install Node.js dependencies
RUN npm i 

# Install Nest.js CLI globally
RUN npm i -g @nestjs/cli

# Build the Nest.js application
RUN npm run build

# Specify the command to run the application when the container starts
CMD ["npm", "run", "start:prod"]