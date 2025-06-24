# Makefile for drawing-kit monorepo managed by npm workspaces

# Show help if no target is given
help:
	@echo "Usage: make [target]"
	@echo "Available targets:"
	@echo "  install     Install all dependencies for all packages via npm workspaces"
	@echo "  clean       Remove all node_modules and package-lock.json files recursively"
	@echo "  test        Run tests for all packages via npm workspaces"
	@echo "  build       Build all packages via npm workspaces (if build scripts exist)"
	@echo "  publish     Publish all public packages to npm via npm workspaces"

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

# Build all packages (if build scripts exist)
build:
	npm run build --workspaces

# Publish all public packages to npm (requires authentication)
publish:
	npm publish --workspaces

.PHONY: help install clean test build publish
