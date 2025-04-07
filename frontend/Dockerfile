# Build stage
FROM node:18-alpine as build

# Install pnpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml* ./

# Install app dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Increase the memory limit and build the application
#ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm run build

# Production stage
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy built files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Install serve to serve the build files
RUN pnpm add serve

# Expose the application port
EXPOSE 5173

# Command to run the application
CMD ["pnpm", "exec", "serve", "-s", "dist", "-l", "5173"]
