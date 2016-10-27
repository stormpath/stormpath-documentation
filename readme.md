#Stormpath Product Guides

*The Stormpath Product Guide documentation repo*

### Install

`pip install Sphinx`

Other options [here](http://www.sphinx-doc.org/en/stable/install.html).

If you already have Sphinx, then just upgrade:

`pip install -U Sphinx`

Then clone this repo.

`git clone --recursive ...`

### Structure

```
├── source
    ├── _static
    ├── _templates
    ├── code
    │   ├── csharp
    │   ├── java
    │   ├── nodejs
    │   ├── php
    │   ├── python
    │   ├── ruby
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

#### Generating Static Docs

`make html` will generate the REST Product Guide as HTML.

`make html LANGUAGE={name}` will generate the Product Guide for the specified language.

The possible values for `{name}` are:

- `rest`
- `php`
- `java`
- `csharp`
- `vbnet`
- `python`
- `nodejs`
- `ruby`

If you would like to generate all of the Product Guides in one go, you can use the same command that Travis uses:

`make allhtml`

This will iterate through every language and generate the Product Guide for that language.

**Note:** This command has an additional `-W` flag that converts all warnings into errors. This means that the build stops at the first warning.

#### Generating Live Docs

In order to generate auto-reloading "live" documentation, use the following command:

`make livehtml`

Just like `make html`, this command can also take a language parameter:

`make livehtml LANGUAGE={name}`

The values for `{name}` are the same as for generating static documentation.

### Viewing the Docs

Once you are finished generating the docs, you can view them with the following command:

`open build/html/index.html`

You can replace `index.html` with whatever chapter you would like.

If you used the `make allhtml` command, then you can find the generated files in:

`build/html/{language}/index.html`

### Contributing to this Repo

All branches should be made off the [Develop](https://github.com/stormpath/stormpath-documentation/tree/develop) branch. After your changes are complete, create a PR back to Develop.

Additionally, if you are working with a task captured in a GitHub issue, please name your branch accordingly. For example: `202_account_linking`.
