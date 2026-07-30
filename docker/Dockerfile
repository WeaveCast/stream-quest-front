FROM node:24.15.0

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]