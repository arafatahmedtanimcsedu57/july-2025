# -----------------------------------------------------
# 1. Builder stage: install everything & build the app
# -----------------------------------------------------
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package manifests (both deps & devDeps)
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies)
RUN npm ci

# Copy the rest of your application code
COPY . .

# Run the Next.js production build
RUN npm run build


# -----------------------------------------------------
# 2. Runner stage: slim runtime image
# -----------------------------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy over only what we need to serve:
#   • Next.js build output
#   • public assets
#   • minimal production node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose Next.js default port
EXPOSE 3000

# Launch the app
CMD ["npm", "run", "start"]
