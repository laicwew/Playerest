# Frontend Dockerfile
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Use Nginx as a production server
FROM nginx:alpine

# Copy the build files to Nginx server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Replace Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
