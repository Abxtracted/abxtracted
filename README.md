# Abxtracted

## Development
Para rodar o projeto em ambiente de desenvolvimento é necessário:

### Back-end
 - Java 1.8
 - Maven
 - Postgres

#### Executando a aplicação

##### Roda em "modo dev":

```sh
$ gulp --cwd ./webapp
$ (cd app; mvn spring-boot:run)
$ open http://localhost:3000
```


##### Deploy em produção

```console
$ ./scripts/ctx && ./scripts/magic
```

PS: Requer o context certo na config do kubernetes e o app certo na config do
gcloud.
