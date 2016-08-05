#Stormpath Product Guides

*The Stormpath Product Guide documentation repo*

### Install

`pip install Sphinx sphinx_rtd_theme`

Other options [here](http://www.sphinx-doc.org/en/stable/install.html).

If you already have Sphinx, then just upgrade:

`pip install -U Sphinx sphinx_rtd_theme`

Then clone this repo.

### Structure

```
├── build
│   ├── doctrees
│   └── html
│       ├── _images
│       ├── _sources
│       └── _static
└── source
    ├── _static
    ├── _templates
    ├── code
    │   ├── csharp
    │   ├── java
    │   ├── nodejs
    │   ├── php
    │   ├── python
    │   ├── template
    │   └── vbnet
    ├── images
    │   ├── about
    │   ├── accnt_mgmt
    │   ├── auth_n
    │   ├── idsite
    │   ├── multitenancy
    │   └── quickstart
    └── robots
```

- All of the `.rst` files are in `source/`
- All code samples are in `source/code/`, sorted by chapter name.
- All images are in `source/images/`, sorted by chapter name.

### How To Generate The Docs

`make html` will generate the REST Product Guide

`make html LANGUAGE={name}` will generate the Product Guide for the specified language.

The possible values for name are:

- `rest`
- `php`
- `java`
- `csharp`
- `vbnet`
- `python`
- `nodejs`

If you would like to generate all of the Product Guides in one go, you can use the same command that Travis uses:

`make allhtml`

This will iterate through every language and generate the Product Guide for that language.

**Note:** This command has an additional `-W` flag that converts all warnings into errors. This means that the build stops at the first warning.

### Viewing the Docs

Once you are finished generating the docs, you can view them with the following command:

`open build/html/index.html`

You can replace `index.html` with whatever chapter you would like.

If you used the `make allhtml` command, then you can find the generated files in:

`build/html/{language}/index.html`

