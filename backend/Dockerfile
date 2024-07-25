FROM openjdk:17-jdk-slim

ARG JAR_FILE=build/libs/*.jar
ARG SPRING_PROFILE

COPY ${JAR_FILE} app.jar

ENTRYPOINT [ "java", "-jar", "-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=dev", "app.jar" ]
