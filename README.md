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
$ (cd app; mvn spring-boot:run)
$ open http://localhost:3000
```


##### Deploy em produção

```console
$ ./magic
```

PS: Requer o context certo na config do kubernetes e o app certo na config do
gcloud.
