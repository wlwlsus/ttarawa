FROM adoptopenjdk/openjdk17:jdk-17.0.1_12-alpine-slim AS build
WORKDIR /app
COPY . .
RUN chown -R $USER:$USER /var/jenkins_home/workspace/jenkins-back/ttrawa
RUN ./mvnw clean package -DskipTests
FROM adoptopenjdk/openjdk17:jdk-17.0.1_12-alpine-slim
WORKDIR /app
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]
