# Door Go App - Backend

## 1. Build and Run the Backend Code

### Method 1: Build a JAR File (Run Locally)

First, connect to MongoDB (Atlas) using environment variables:

- Step 1: Reference an environment variable in `application.properties`
  ```properties
  spring.data.mongodb.uri=${MONGODB_URI}
  spring.data.mongodb.database=<database-name>
  ```
- Step 2: Set up the `MONGODB_URI` environment variable

  Add the export command to your (macOS/Linux) shell's profile script (~/.bash_profile, ~/.bashrc, or ~/.zshrc for Bash or Zsh):
  ```
  export MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-name>.<project-name>.mongodb.net/?retryWrites=true&w=majority"
  ```
  ```shell
  $ source ~/.zshrc # Reload your shell's configuration with the source command
  $ echo $MONGODB_URI # Verify. This should output your connection string to the terminal.
  ```

Then, build and run the JAR file:
```shell
$ brew install maven # Install Maven on macOS
$ cd backend
backend $ mvn package # Build a JAR file

backend $ java -jar ./target/backend-0.0.1-SNAPSHOT.jar # Run the JAR file
```

### Method 2: Build a Docker Image (Deploy on Google Cloud Run)

#### Build an image with Spring Boot Maven Plugin and run it:
```shell
$ cd backend
backend $ ./mvnw spring-boot:build-image # it will build a jar file into the target directory automatically

$ docker run -e MONGODB_URI="your-mongodb-atlas-uri" -p 8080:8080 backend:0.0.1-SNAPSHOT # Run the container with connecting to MongoDB Atlas
```

#### Or build an image with Dockerfile and run it (faster build):
```shell
$ cd backend
backend $ mvn package # Build a JAR file if not built yet
backend $ docker build -t doorgo-backend:latest . # Build a Docker image. Name: doorgo-backend, Tag: 0.0.1-SNAPSHOT

$ docker run -e MONGODB_URI="your-mongodb-atlas-uri" -p 8080:8080 doorgo-backend:0.0.1-SNAPSHOT # Run the container with connecting to MongoDB Atlas
```

#### Push the image to Docker Hub:
```shell
$ docker login # Login to Docker Hub
$ cd backend
backend $ docker tag doorgo-backend:latest username/doorgo-backend:latest # Tag the image
backend $ docker push username/doorgo-backend:latest # Push the image to Docker Hub
```

#### Build a linux/amd64 image on macOS with Apple Silicon (linux/arm64):

```shell
$ cd backend
backend $ mvn package # Build a JAR file if not built yet
backend $ # Build and upload the image to Docker Hub.
backend $ docker buildx build --platform linux/amd64 -t username/doorgo-backend . --push
```

### Method 3: Build a Docker Image with Dockerfile and docker-compose.yml (Deploy on a single Linux server)

Build and run it with Dockerfile and docker-compose.yml:  
First, create a `db/mongodb_uri.txt` (do not commit it with Git) in the project's root directory and put your MongoDB Atlas URI in it, then:
```shell
$ cd backend
backend $ mvn package # Build a JAR file if not built yet
$ cd ..
$ docker compose up -d --build # Build and run the container in the background
```

Down it:
```shell
$ docker compose down # Stop and remove containers, networks, images, and volumes
```

---

## 2. Maven Configuration (for IntelliJ IDEA)

Since the `pom.xml file` is inside the backend directory, you'll have to
import that specific folder as a Maven project in IntelliJ IDEA:

1. Open IntelliJ IDEA, open the doorgo-app project.
2. Navigate to the `File -> New -> Module from Existing Sources...`.
3. In the file browser that opens, open `backend -> pom.xml`.
4. In the new window that opens, make sure Import module from external model is selected and Maven is highlighted, then click Next.
5. Leave the default options in the following steps and keep clicking Next until you can click Finish.

After performing these steps, IntelliJ IDEA should recognize the backend
directory as a Maven project, and the Maven tool window should be available
on the right-hand side of the IDE.