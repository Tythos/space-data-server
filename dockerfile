# Use an official Ubuntu runtime as a parent image
FROM ubuntu:latest
FROM node:18

# Set the working directory to /spacedataserver
WORKDIR /opt/software/space-data-server

# Copy the current directory contents into the container at /spacedataserver
COPY . /opt/software/space-data-server

# Define environment variable
ENV NODE_ENV=production
ENV PORT=8080

# Make the specified port available to the world outside this container
EXPOSE $PORT

# Run app.js when the container launches
CMD ["npm", "start"]
