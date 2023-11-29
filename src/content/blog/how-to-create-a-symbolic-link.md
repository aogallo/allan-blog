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

I will show you how to create a symbolic link in macOS, to show that I will use my neovim configuration in [my dotfiles repository]("https://github.com/aogallo/dotfiles.git")

`ln` creates a new directory entry (linked file) with the same modes as the original.

Syntax:

ln -[fhinsv] OriginalDestination NewDestination

Options:
-f If the target file already exists, then unlink it so that the link
can occur. (The -f option overrides any previous -i options.)

-h If the NewLinkFile (or directory) is a symbolic link, do not follow
it. This is most useful with the -f option, to replace a symlink
which can point to a directory.

-i Cause ln to write a prompt to standard error if NewLinkFile
exists. If the response from the standard input begins with the
character 'y' or 'Y', then unlink the NewLinkFile file so that the link
can occur. Otherwise, do not attempt the link. (The -i option
overrides any previous -f options.)

-n Same as -h, for compatibility with other ln implementations.

-s Create a symbolic link.

-v Cause ln to be verbose, showing files as they are processed.

So the structure to create symbolic link is

```bash
ln -s /origin/location /destinatio/location
```
