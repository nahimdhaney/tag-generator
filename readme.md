# Generate tags

This is a CLI that generates tags (branch and release) based in your current git branch and push into the git repo you are using.

In order to create correctly this tag first the CLI fetch all tags that are remote.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```bash
npm i generate-tags -g
```

## Usage

if your branch name is **main** and you: 

```bash
generate-tags -r (or -release)
```
this will generate for example **release-main-1** then **release-main-2** then **release-main-3** ... and so on.

------

```bash
generate-tags -b (or -branch)
```
this will generate for example **branch-main-1** then **branch-main-2** then **branch-main-3** ... and so on.

