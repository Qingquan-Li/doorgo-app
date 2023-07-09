# Door Go App - Backend

## Build and Run the Backend Code

### Build a JAR File

Install Maven on macOS:
```shell
$ brew install maven
```

Build it:
```shell
$ cd backend
backend $ mvn package
```

Run it:
```shell
$ cd backend
backend $ java -jar ./target/backend-0.0.1-SNAPSHOT.jar
```

### Build a Container (Docker) Image

Build it:
```shell
$ cd backend
backend $ ./mvnw spring-boot:build-image
```

List the available images:
```shell
$ docker images
```

Run it:
```shell
$ docker run -p8080:8080 backend:0.0.1-SNAPSHOT
```

Run it with connecting to MongoDB Atlas:
```shell
$ docker run -e MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-name>.<project-name>.mongodb.net/?retryWrites=true&w=majority" -p 8080:8080 backend:0.0.1-SNAPSHOT
```

## Connect to MongoDB

### Method 1
In `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster-name>.<project-name>.mongodb.net/?retryWrites=true&w=majority
spring.data.mongodb.database=<database-name>
```

### Method 2 - Using environment variables

#### Step 1: Reference an environment variable in `application.properties`

```properties
spring.data.mongodb.uri=${MONGODB_URI}
spring.data.mongodb.database=<database-name>
```

#### Step 2: Set up the `MONGODB_URI` environment variable

Add the export command to your (macOS/Linux) shell's profile script
(~/.bash_profile, ~/.bashrc, or ~/.zshrc for Bash or Zsh):
```
export MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-name>.<project-name>.mongodb.net/?retryWrites=true&w=majority"
```

Reload your shell's configuration with the source command. For example:
```shell
source ~/.zshrc
```

Verify. This should output your connection string to the terminal:
```shell
echo $MONGODB_URI
```


## Maven Configuration (for IntelliJ IDEA)

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