# Abxtracted

## Development
Para rodar o projeto em ambiente de desenvolvimento é necessário:

### Back-end
 - Java 1.8
 - Maven
 - Postgres

#### Executando a aplicação

##### Cria um jar com tudo:

```console
$ gulp --cwd ./webapp prod
$ mvn clean install -f ./app/pom.xml
$ java -jar ./app/target/api-1.0-SNAPSHOT.jar
$ open http://localhost:8080
```

##### Roda em "modo dev":

```sh
$ gulp --cwd ./webapp
$ mvn spring-boot:run -f ./app/pom.xml
$ open http://localhost:3000
```
