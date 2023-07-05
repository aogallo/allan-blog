---
title: Neovim Configuration
author: Allan Gallo
pubDatetime: 2023-07-04T05:17:19Z
postSlug: neovim-configuration
featured: false
draft: false
tags:
  - neovim
ogImage: ""
description: This blog will help you to install and customized your vim configuration
---

Neovim is an hyperextensible Vim-based text editor

## Steps

### Installation

To install Neovim [here](https://github.com/neovim/neovim/wiki/Installing-Neovim) you will find the ways
to install Neovim according to you system.

I will use `homebrew` to install Neovim.

If you do not have homebrew go to this [page](https://github.com/neovim/neovim/wiki/Installing-Neovim)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

To install Neovim with Homebrew you can use the following command:

```bash
brew install neovim
```

### Configuration

Create the directory:

```bash
mkdir -p ~/.config/nvim
```

### The folder structure

This is the folder structure we will use:

```
├── init.lua
└── lua
    └── <YOUR_NAME>
        ├── core                -> The directory with basis configuration
        ├── plugins             -> The directory with custom plugin configuration
        └── plugins-setup.lua   -> The list of plugins
```

### Setup the options

Create the `options.lua` file:

```bash
vim ~/.config/nvim/lua/<YOUR_NAME>/core/options.lua
```

Add the following options:

```vim
local opt = vim.opt

-- line numbers
opt.relativenumber = true
opt.number = true

-- tabs & indentation
opt.tabstop = 2
opt.shiftwidth = 2
opt.expandtab = true
opt.autoindent = true
opt.mouse = "a"

-- line wrapping
opt.wrap = false

-- search settings
opt.ignorecase = true
opt.smartcase = true

-- cursor line
opt.cursorline = true
opt.cursorcolumn = true

-- appearance
opt.termguicolors = true
opt.background = "dark"
opt.signcolumn = "yes"

-- backspace
opt.backspace = "indent,eol,start"

-- clipboard
opt.clipboard: append("unnamedplus")

-- split windows
opt.splitright = true
opt.splitbelow = true

-- add - as word
opt.iskeyword:append("-")

opt.lazyredraw = true
```

### Setup the plugins

Create the `plugins-setup.lua` file:

```bash
touch ~/.config/nvim/lua/<YOUR_NAME>/plugins-setup.lua
```

Install Packer, you can check the [quickstart](https://github.com/wbthomason/packer.nvim#quickstart) section

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

List of plugins:

```vim
-- Colorscheme
use 'navarasu/onedark.nvim'

-- Telescope
use ({ "nvim-telescope/telescope-fzf-native.nvim", run = "make" })
use ({ "nvim-telescope/telescope.nvim", branch = "0.1.x" })

-- autocompletion
use 'hrsh7th/nvim-cmp'
use 'hrsh7th/cmp-buffer'
use 'hrsh7th/cmp-path'

-- snippets
use({
"L3MON4D3/LuaSnip",
})
use 'saadparwaiz1/cmp_luasnip'
use 'rafamadriz/friendly-snippets'

-- LSP
use 'williamboman/mason.nvim'
use 'williamboman/mason-lspconfig.nvim'
use 'neovim/nvim-lspconfig'
use 'hrsh7th/cmp-nvim-lsp'
use ({ "glepnir/lspsaga.nvim", branch = "main" })
use 'jose-elias-alvarez/typescript.nvim'
use 'onsails/lspkind.nvim'

```

### Setup Colorscheme

Create the `colorscheme.lua` file:

```bash
vim ~/.config/nvim/lua/<YOUR_NAME>/core/colorscheme.lua
```

And add the following:

```vim
local status, _ = pcall(vim.cmd, "colorscheme onedark")

if not status then
  print("Colorscheme not found!")
  return
end
```

### Setup the keymaps

Create the `keymaps.lua` file:

```bash
vim ~/.config/nvim/lua/<YOUR_NAME>/core/keymaps.lua
```

And add the following:

```vim
vim.g.mapleader = " "

local keymap = vim.keymap
-- local keymap = vim.api.nvim_set_keymap
local options = { noremap = true, silent = true}

-- general keymaps
keymap.set("i", "jk", "<ESC>", options)
keymap.set("i", "JK", "<ESC>", options)
keymap.set("v", "<leader>JK", "<ESC>", options)
keymap.set("v", "<leader>jk", "<ESC>", options)

-- Save file
keymap.set("n", "<leader>ss", ":w<cr>", options)
keymap.set("i", "<C-s>", "<ESC>:w<cr>", options)

-- Search
keymap.set("n", "<leader>nh", ":nohl<CR>", options)

-- Increment & Decrement
keymap.set("n", "+", "<C-a>", options)
keymap.set("n", "-", "<C-x>", options)

-- Select all
keymap.set("n", "<C-a>", "gg<S-v>G", options)

-- split window
keymap.set("n", "<leader>sv", "<C-w>v", options) -- vertically
keymap.set("n", "<leader>sh", "<C-w>s", options) -- horizontally
keymap.set("n", "<leader>se", "<C-w>=", options) -- make split windows equeal width
keymap.set("n", "<leader>sx", ":close<CR>", options) -- close current split window

-- tab move
keymap.set("n", "<leader>to", ":tabnew<CR>", options) -- open new tab
keymap.set("n", "<leader>tx", ":tabclose<CR>", options) -- close current tab
keymap.set("n", "<leader>tn", ":tabn<CR>", options) -- go to next tab
keymap.set("n", "<leader>tp", ":tabp<CR>", options) -- go to previous tab

-- Move between screen
keymap.set("n", "<C-l>", "<C-w>l", options)
keymap.set("n", "<C-h>", "<C-w>h", options)
keymap.set("n", "<C-j>", "<C-w>j", options)
keymap.set("n", "<C-k>", "<C-w>k", options)

-- Terminal mode
keymap.set("t", "jk", "<C-\\><C-n>", options)
keymap.set("t", "JK", "<C-\\><C-n>", options)

-- Moves blocks of code in visual mode
keymap.set("x", "U", ":move '<-2<CR>gv-gv", options)
keymap.set("x", "D", ":move '<+1<CR>gv-gv", options)

-- Keep the selected lines in visual mode to add indentetion
keymap.set("v", "<", "<gv", options)
keymap.set("v", ">", ">gv", options)

-- Delete single character without copying into register
keymap.set("n", "x", '"_x', options)

-- Go to end line in insert mode
keymap.set("i", "<C-e>", "<C-o>$", options)
-- go to the end line and insert new line
keymap.set("i", "<C-x>", "<esc>o", options)

--Format file
keymap.set("v", "<leader>fm", ":lua vim.lsp.buf.format()", options)


---------------------
-- Plugin Keybinds
---------------------

-- vim-maximizer
keymap.set("n", "<leader>sm", ":MaximizerToggle<CR>", options)

-- bufferline
keymap.set("n", "<leader>1", "<Cmd>BufferLineGoToBuffer 1<CR>", options)
keymap.set("n", "<leader>2", "<Cmd>BufferLineGoToBuffer 2<CR>", options)
keymap.set("n", "<leader>3", "<Cmd>BufferLineGoToBuffer 3<CR>", options)
keymap.set("n", "<leader>4", "<Cmd>BufferLineGoToBuffer 4<CR>", options)
keymap.set("n", "<leader>5", "<Cmd>BufferLineGoToBuffer 5<CR>", options)
keymap.set("n", "<leader>6", "<Cmd>BufferLineGoToBuffer 6<CR>", options)
keymap.set("n", "<leader>7", "<Cmd>BufferLineGoToBuffer 7<CR>", options)
keymap.set("n", "<leader>8", "<Cmd>BufferLineGoToBuffer 8<CR>", options)
keymap.set("n", "<leader>9", "<Cmd>BufferLineGoToBuffer 9<CR>", options)
keymap.set("n", "<leader>$", "<Cmd>BufferLineGoToBuffer -1<CR>", options)


-- L3MON4D3/LuaSnip
keymap.set("i", "<c-j>", "<cmd>lua require'luasnip'.jump(1)<CR>", options)
keymap.set("s", "<c-j>", "<cmd>lua require'luasnip'.jump(1)<CR>", options)
keymap.set("i", "<c-k>", "<cmd>lua require'luasnip'.jump(-1)<CR>", options)
keymap.set("s", "<c-k>", "<cmd>lua require'luasnip'.jump(-1)<CR>", options)
```
