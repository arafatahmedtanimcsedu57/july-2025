# -----------------------------------------------------
# 1. Builder stage: install everything & build the app
# -----------------------------------------------------
FROM node:18-bullseye AS builder

# Create app directory
WORKDIR /app

# Install Python and build tools for native dependencies
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Copy package manifests (both deps & devDeps)
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies)
RUN npm ci --legacy-peer-deps --include=optional

# Ensure sharp is properly installed
RUN npm rebuild sharp

# Copy the rest of your application code
COPY . .

# Set environment variable for SWC
ENV NEXT_DISABLE_SWC=false

# Run the Next.js production build
RUN npm run build


# -----------------------------------------------------
# 2. Runner stage: slim runtime image
# -----------------------------------------------------
FROM node:18-bullseye-slim AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy over only what we need to serve:
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose Next.js default port
EXPOSE 3000

# Launch the app
CMD ["npm", "run", "start"]