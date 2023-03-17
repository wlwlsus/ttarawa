# First stage - build the project
FROM openjdk:17-jdk-slim as builder

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

# Second stage - build the Docker image
FROM docker.elastic.co/elasticsearch/elasticsearch:7.15.1

# elasticsearch user/group id
ENV ES_UID=1100
ENV ES_GID=1100

# create elasticsearch group/user with specific uid/gid
RUN groupadd -g $ES_GID elasticsearch \
  && useradd -u $ES_UID -g $ES_GID -d /usr/share/elasticsearch elasticsearch

# set ownership to elasticsearch user/group for data folder
RUN chown -R elasticsearch:elasticsearch /usr/share/elasticsearch/data

# copy the built jar file from the builder stage
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8080

ARG SERVER_MODE
RUN echo "$SERVER_MODE"
ENV SERVER_MODE=$SERVER_MODE

ENTRYPOINT ["java", "-Dspring.profiles.active=${SERVER_MODE}", "-Duser.timezone=Asia/Seoul", "-jar", "/app.jar"]
