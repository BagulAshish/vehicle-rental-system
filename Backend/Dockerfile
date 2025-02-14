FROM openjdk:17-jdk-slim

WORKDIR /app

COPY wait-for-it.sh /app/wait-for-it.sh
COPY target/*.jar app.jar

RUN chmod +x /app/wait-for-it.sh

EXPOSE 8080

CMD ["/app/wait-for-it.sh", "mysql:3306", "--", "java", "-jar", "app.jar"]
