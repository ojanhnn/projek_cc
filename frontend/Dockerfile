FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 5000
CMD ["npm", "start"]