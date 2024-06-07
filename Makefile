-include .env

# Installation commands

install:; make forge-install && yarn install && make install-dependencies

forge-install:
	rm -rf lib \
	&& forge install --no-git micro-capital/v3-core \
	&& forge install --no-git micro-capital/v3-periphery \
	&& forge install --no-git micro-capital/universal-router

install-dependencies:
	yarn install --cwd ./lib/v3-core \
	&& yarn install --cwd ./lib/v3-periphery \
	&& yarn install --cwd ./lib/universal-router

# Linting commands

lint-fix:; make lint-ts-fix && make lint-json-fix

lint-json-fix:; yarn prettier --write "./**/*.json"

lint-ts-fix:; yarn prettier --write "./**/*.ts"
