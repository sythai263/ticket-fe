# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /app/

# Install app dependencies
RUN npm install --legacy-peer-deps


# Bundle app source
COPY . /app/

EXPOSE 8000

# Creates a "dist" folder with the production build
RUN npm start

