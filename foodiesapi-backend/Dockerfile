FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/foodiesapi-*jar app.jar

COPY foodies-credentials /config

ENV SPRING_CONFIG_IMPORT:/config/env.config.properties

EXPOSE 8085

ENTRYPOINT ["java" "-jar" "app.jar"]