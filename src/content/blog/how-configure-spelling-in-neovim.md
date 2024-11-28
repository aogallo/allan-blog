---
author: Allan Gallo
pubDatetime: 2024-11-28T18:23:00.237Z
title: How configure spell checking in neovim
postSlug: how-configure-spell-checking-in-neovim
featured: false
draft: false
tags:
  - neovim
  - vim
  - spelling
  - spell
  - spelllang
ogImage: ''
description: ' Help to identify possible misspellings into neovim '
---
# Configure spelling into neovim

We need to configure two options such as spell and language.

Lua configuration

```lua
vim.opt.spell = true

-- you can configure any language
-- default is `en`
vim.opt.spelllang = "en_us"
```

If you are using vim script

```vim
:setlocal spell spelllang=en_us
```

## Keymaps

To search for the next misspelled word:

| Key map | Description                      |
| ------- | -------------------------------- |
| ]s      | Move to next misspelled word     |
| [s      | Move to previous misspelled word |

To add words to your own word lists:

| Key map | Description                                 |
| ------- | ------------------------------------------- |
| zg      | Add word under the cursor to the dictionary |

Finding suggestions for bad wrods:

| Key map | Description                          |
| ------- | ------------------------------------ |
| z=      | Show suggest correctly spelled words |

## Resources

- [Neovim spell docs](https://neovim.io/doc/user/spell.html)
- [spelllang docs](https://neovim.io/doc/user/spell.html)

Also you can execute this command to view the help in neovim

```vim
:h spell
```

