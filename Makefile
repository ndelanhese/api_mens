include .make.env

ifeq ($(filter $(MAKE_ENV), local staging production),)
$(error Invalid MAKE_ENV value. Values accepteds: local, staging or production.)
endif

DOCKER_COMPOSE_FILE=.docker/$(MAKE_ENV)/docker-compose.yml
DOCKER_ENV_FILE=.docker/$(MAKE_ENV)/.env

ifeq ($(wildcard $(DOCKER_COMPOSE_FILE)),)
$(error $(DOCKER_COMPOSE_FILE) not found.)
endif

ifeq ($(wildcard $(DOCKER_ENV_FILE)),)
$(error $(DOCKER_ENV_FILE) not found.)
endif

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Colors definitions                                                          │
# └─────────────────────────────────────────────────────────────────────────────┘
CR=\033[0;31m
CG=\033[0;32m
CY=\033[0;33m
CB=\033[0;36m
RC=\033[0m

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ API commands                                                                │
# └─────────────────────────────────────────────────────────────────────────────┘
.PHONY: api-build
api-build:
	@docker exec scansource_api bash -c "npm run build"

.PHONY: api-dev
api-dev:
	@docker exec -it scansource_api bash -c "npm run dev"

.PHONY: api-exec
api-exec:
	@docker exec -it scansource_api bash

.PHONY: api-install
api-install:
	@docker exec -it scansource_api bash -c "npm install"

.PHONY: redis-exec
redis-exec:
	@docker exec -it scansource_redis bash 
  

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Infra commands                                                              │
# └─────────────────────────────────────────────────────────────────────────────┘
.PHONY: build
build:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) build

.PHONY: start
start:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) up -d

.PHONY: stop
stop:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) down

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Help                                                                        │
# └─────────────────────────────────────────────────────────────────────────────┘
help:
	@echo ""
	@echo "${CY}Usage${RC}"
	@echo "   make ${CG}<command>${RC}"
	@echo ""
	@echo "${CY}Infra commands${RC}"
	@echo "${CG}   build   ${RC}Build all containers"
	@echo "${CG}   start   ${RC}Start all containers"
	@echo "${CG}   stop    ${RC}Stop all containers"
	@echo ""
	@echo "${CY}API commands${RC}"
	@echo "${CG}   api-build           ${RC}Build api distribution files"
	@echo "${CG}   api-dev             ${RC}Start a development server"
	@echo "${CG}   api-exec            ${RC}Enter inside the api container"
	@echo "${CG}   api-install         ${RC}Install api dependencies"
	@echo "${CG}   redis-exec             ${RC}Enter inside the redis container"
	@echo ""
