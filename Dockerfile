# Use the official Node.js image as builder
FROM docker.io/library/node:16.4 as builder
LABEL authors="Guilamb"

# Set the working directory inside the container
WORKDIR /headlamp-plugins

# Copy the current directory contents into the container
COPY ./ /headlamp-plugins/

# Create a directory for build output
RUN mkdir -p /headlamp-plugins/build

# Update npm version
RUN npm install -g npm@10.8.1

# Build the headlamp plugin inside the container
# RUN npx @kinvolk/headlamp-plugin build /headlamp-plugins
RUN npm install -g @kinvolk/headlamp-plugin

RUN headlamp-plugin build /headlamp-plugins

RUN headlamp-plugin extract /headlamp-plugins/ /headlamp-plugins/build
# Extract the built plugin
# RUN npx @kinvolk/headlamp-plugin extract /headlamp-plugins/ /headlamp-plugins/build

FROM alpine:latest

# Copy the built plugin from the builder stage to the final image
COPY --from=builder /headlamp-plugins/build/ /plugins/

CMD ["/bin/sh -c 'mkdir -p /build/plugins && cp -r /plugins/* /build/plugins/'"]
