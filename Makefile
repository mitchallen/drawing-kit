# Makefile for drawing-kit monorepo managed by npm workspaces

# Show help if no target is given
help:
	@echo "Usage: make [target]"
	@echo "Available targets:"
	@echo "  install     Install all dependencies for all packages via npm workspaces"
	@echo "  clean       Remove all node_modules and package-lock.json files recursively"
	@echo "  test        Run tests for all packages via npm workspaces"
	@echo "  coverage    Run every package's tests; fails unless coverage is 100%"
	@echo "  whoami      Show the current npm user (test registry authentication)"

.DEFAULT_GOAL := help

# Install all dependencies for all packages
install:
	npm install

# Clean all node_modules and package-lock.json files
clean:
	rm -rf node_modules
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
	find . -name 'package-lock.json' -type f -delete

# Run tests for all packages
# (Assumes each package has a test script)
test:
	npm test --workspaces

# Coverage is internal: each package must stay at 100% statements, branches,
# functions and lines, or this target fails.
coverage:
	npm run coverage --workspaces

# Show current npm user
whoami:
	npm whoami

.PHONY: help install clean test coverage whoami
