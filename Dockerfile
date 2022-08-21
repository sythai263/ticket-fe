FROM node:lts AS development
# Set working directory
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# Same as npm install
RUN npm i --legacy-peer-deps
COPY . /app
ENV CI=true
ENV PORT=8000
ENV REACT_APP_API_URL=https://api.musreview.org/
CMD [ "npm", "start" ]
FROM development AS build
RUN npm run build