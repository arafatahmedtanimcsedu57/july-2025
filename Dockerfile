# 1️⃣ Base image
FROM node:20-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files first (for caching)
COPY package.json package-lock.json ./

# 4️⃣ Install dependencies
RUN npm install --legacy-peer-deps

# 5️⃣ Copy rest of the app
COPY . .

# 6️⃣ Expose custom port (change if needed)
EXPOSE 3000

# 7️⃣ Set environment variable to customize port if needed
#ENV PORT=3554

# 8️⃣ Start app in development mode
CMD ["npm", "run", "dev"]
