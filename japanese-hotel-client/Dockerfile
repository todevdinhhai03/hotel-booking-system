#production environment
# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist /app
COPY package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "dist/index.js"]

