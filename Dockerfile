FROM maven:3.8-openjdk-17 AS maven-build
COPY ./pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean install

FROM openjdk:17-jdk-slim
COPY --from=maven-build /target/geoPartners-0.0.1-SNAPSHOT.jar geopartners.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "geopartners.jar"]
