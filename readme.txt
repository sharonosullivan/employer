In this project I use Spring Boot, so you not need to install server, project has his own server (tomcat).
In folder src/main/resources/sql sql script for creating database with needed tables and query for inserting departments.
In folder src/main/resources in file application.properties change credentials to your database.
You just need to build project by using maven (command: mvn clean install) and in folder target you receive executable jar file, run him to launch project.
