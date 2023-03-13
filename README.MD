# Development Scan Source

## Softwares required

This softwares are indispensable to use the API.

### Docker

To inst**all** the Docker on your machine using the following step-by-step.

- On Ubuntu, use this link: [click here](https://www.digitalocean.com/community/tutorials/how-to-inst**all**-and-use-docker-on-ubuntu-22-04)

- On Fedora, use this link: [click here](https://docs.docker.com/engine/inst**all**/fedora/)

- Other distros, use this link: [click here](https://docs.docker.com/engine/inst**all**/)

### Docker Compose

To inst**all** the Docker Compose on your machine using the following commands.

- On Ubuntu, use this link: [click here](https://www.digitalocean.com/community/tutorials/how-to-inst**all**-and-use-docker-compose-on-ubuntu-20-04)

- On Fedora, use this link: [click here](https://developer.fedoraproject.org/tools/docker/compose.html)

- Other distros, use this link: [click here](https://docs.docker.com/compose/inst**all**/)

## Inst**all** and config

### 1. Attention:

```txt
It is extremely important for the development environment to use the develop branch or some other branch derived from it.
```

### 2. Create .env file

```bash
$ cp .env.example .env
```

> **_Attention!_**
>
> - Don't forget to fill in **ALL** fields in the .env

### 3. Create .make.env file

```bash
$ cp .make.env.example .make.env
```

> **_Attention!_**
>
> - Don't forget to fill in **ALL** fields in the .env

### 4. Create .env file docker

```bash
$ cd .docker/local
$ cp .env.example .env
$ cd ..
$ cd .docker/staging
$ cp .env.example .env
```

> **_Attention!_**
>
> - Don't forget to fill in **ALL** fields in the .env

### 5. Initialize docker services:

```bash
$ make start
```

### 6. Config virtual hosts:

Add the following redirects on `/etc/hosts` file.

```bash
# scansource-api
127.0.0.1       api.scansource.local
```

### 7. Migrate and seeders project:

```bash
$ make api-exec
$ npm run build
$ npm run db:reset
$ exit
```

## Make commands

List **all** make commands available on application.

```bash
$ make help
```

## Development API

Enter bash containers

```bash
$ make api-exec
```

Development with hot reload

```bash
$ make api-dev
```
