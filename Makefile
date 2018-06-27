SHELL := /bin/bash
PATH := $(shell npm bin):$(PATH)

SEMVER = ./node_modules/.bin/semver
PACKAGE = ./package.json
VERSION = $(shell node -pe 'require("$(PACKAGE)").version')
DIST = ./dist

patch: NEXT_VERSION = $(shell $(SEMVER) -i patch $(VERSION))
minor: NEXT_VERSION = $(shell $(SEMVER) -i minor $(VERSION))
major: NEXT_VERSION = $(shell $(SEMVER) -i major $(VERSION))

patch minor major:
	sed -i "" 's/"version": "$(VERSION)"/"version": "$(NEXT_VERSION)"/g' $(PACKAGE)
	git commit $(PACKAGE) -m 'chore: bump version to $(NEXT_VERSION)' -n
	git tag -a "v$(NEXT_VERSION)" -m 'chore: bump version to $(NEXT_VERSION)'
	git push --tags origin HEAD:master

