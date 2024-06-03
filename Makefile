-include .env

# Installation commands

install:; make forge-install && npm install

forge-install:
	rm -rfv lib \
	&& forge install --no-git micro-capital/v3-core \
	&& forge install --no-git micro-capital/v3-periphery \
	&& forge install --no-git micro-capital/universal-router

# Linting commands

lint-fix:; make lint-ts-fix && make lint-json-fix

lint-json-fix:; npx prettier --write "./**/*.json"

lint-ts-fix:; npx prettier --write "./**/*.sol"
