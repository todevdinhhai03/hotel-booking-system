# Use a Java runtime as a base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built Spring Boot application JAR file to the container
COPY target/*.jar /app/spring-server.jar

# Expose the port that the application will run on
EXPOSE 9191

# Set the entry point for the container to run the JAR file
CMD ["java", "-jar", "/app/spring-server.jar"]
