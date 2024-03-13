FROM eclipse-temurin:17-jdk-focal

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
EXPOSE 8080
ENTRYPOINT ["./mvnw","spring-boot:run"]
