---
title: How to create a symbolic link in macOS
author: Allan Gallo
pubDatetime: 2023-11-28T00:00:00
postSlug: how-to-create-a-symbolic-link-in-macos
featured: false
draft: false
tags:
  - macos
  - terminal
description: You will learn how to create a symbolic link in macOS
---

I will show you how to create a symbolic link in macOS in the terminal, to show that I will use my neovim configuration in [my dotfiles repository](https://github.com/aogallo/dotfiles.git)

`ln` creates a new directory entry (linked file) with the same modes as the original.

Syntax:

ln -s OriginalDestination NewDestination

-s Create a symbolic link.

So the structure to create symbolic link is

```bash
ln -s /origin/location /destination/location
```
