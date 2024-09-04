# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
# Copy file build từ giai đoạn build sang thư mục Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy cấu hình tùy chọn cho Nginx (nếu có)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Khởi động Nginx server
CMD ["nginx", "-g", "daemon off;"]