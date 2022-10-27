FROM node:14.14
WORKDIR /app
COPY . .
RUN npm install --force
EXPOSE 4000
CMD ["node", "index.js"]
