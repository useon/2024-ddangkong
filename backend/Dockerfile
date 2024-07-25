FROM openjdk:17-jdk-slim

ARG JAR_FILE=build/libs/*.jar
ARG SPRING_PROFILE

RUN echo "now profile: $SPRING_PROFILE"

COPY ${JAR_FILE} app.jar

ENTRYPOINT [ "/bin/sh", "-c", "java", "-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=$SPRING_PROFILE", "app.jar" ]
