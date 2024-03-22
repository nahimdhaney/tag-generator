# Generate tags

This is a cli that just generate tags (branch and release) based in your current branch  and push into the git repo.

In order to create correctly the tags first the cli fetch the tags that are remote.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

npm i generate-tags -g

## Usage

if your branch **name** is main and you: 

```bash
generate-tags -r (or -release)
```
this will generate for example **release-main-1** then **release-main-2** then **release-main-2** ... and so on.

------

```bash
generate-tags -b (or -branch)
```
this will generate for example **branch-main-1** then **branch-main-2** then **branch-main-3** ... and so on.

