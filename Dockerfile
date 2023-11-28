# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the local files to the container
COPY . .

# Expose the port on which the app runs
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
