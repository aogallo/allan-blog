---
author: Allan Gallo
pubDatetime: 2023-06-05T19:57:52.737Z
title: How to use Pyenv
postSlug: how-to-use-pyenv
featured: false
draft: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - pyenv
description: I will show you how to use pyenv in dev environment
---

## Table of contents
## Installation

### Pyenv

Install `pyenv`, if you want more information you can go to [Github](https://github.com/pyenv/pyenv) repository.

```bash
brew update
brew install pyenv
```

### After installation

Add to your zsh profile the following:

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

### Install pyenv-virtualenv

```bash
brew install pyenv-virtualenv
```

### Install specific version

```bash
pyenv install 3.7
```

## Virtual Environment

### Create a virtual environment

```bash
mkdir project && cd project
pyenv virtual <version python> <env name>
```

### Activate environment

```bash
pyenv activate <env name>
```

### Deactivate environment

```bash
pyenv deactivate
```

## Upgrading

### Upgrading wiht Homebrew

```bash
brew upgrade pyenv
```

## Uninstall

### Uninstall pyenv

```bash
brew uninstall pyenv
```
