FROM node:24-alpine AS build
WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# copy source and build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
