FROM node:19.03.1-alpine

WORKDIR /app

COPY . /app

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]