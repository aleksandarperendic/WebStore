.PHONY: clean install build docker startLocal stopLocal help

ifneq ("$(wildcard Makefile.*)","")
include Makefile.*
endif

IMAGE_NAME := webstore-telenor
TAG ?= local

.PHONY: default
default: | docker startLocal  ## Build the Docker image for this module and start dev

clean: ## Remove generated build files
	rm -rf dist
	rm -rf node_modules

install: ## Run 'npm ci' to install the required modules
	npm ci

build: | install ## Compile the modules required and build
	npm run build

docker: ## Build Docker image
	docker build --tag $(IMAGE_NAME):$(TAG) .

startLocal: ## Start locally from the built image
	docker compose -p "webstore-container" up -d

stopLocal: ## Stop the local container
	docker compose -p "webstore-container" down

help: Makefile  ## Print this help screen
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)