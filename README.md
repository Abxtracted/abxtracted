# Abxtracted

## Development
Para rodar o projeto em ambiente de desenvolvimento é necessário:

### Back-end
 - Java 1.8
 - Maven
 - Postgres


### Variáveis de ambiente
 - Obrigatórias
    - GOOGLE_AUTH_CLIENT
    - GOOGLE_AUTH_SECRET
    - GOOGLE_AUTH_CALLBACK
- Opcionais
    - DATABASE_URL: default *jdbc:postgresql://localhost:5432/abxtract*
    - DATABASE_USER: default *postgres*
    - DATABASE_PASSWORD: default *postgres*
    - DOMAIN: default *localhost*

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
