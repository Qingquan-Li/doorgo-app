# First stage: Maven build
FROM maven:3.8.1-openjdk-17 as build

# Set the current working directory inside the Docker image
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Download the dependencies - this will only be re-run if the pom.xml file changes
RUN mvn dependency:go-offline -B

# Copy the rest of the source code
COPY src /app/src

# Build the project and produce the JAR file
RUN mvn package -DskipTests

# Second stage: Run the JAR
FROM eclipse-temurin:17-jdk-focal

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]
