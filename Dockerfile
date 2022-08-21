# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

RUN npm install react-scripts@3.41 -g — silent

# Bundle app source
COPY . ./

# Creates a "dist" folder with the production build
CMD [“npm”, “start”]

