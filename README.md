*This repo is still in design phase and is currently unusable. Please check back later!*

# vigour-docs
A collection of tools to help make great docs with minimal effort

`npm install vigour-docs` (coming soon)

## Usage
Opt-in to certain behaviours by including placeholder comments in your `.md` files. Then:

```sh
$ vdocs
```

## Behaviours

### [badges]()
```md
<!-- VDOCS.badges <name>[(options)], ...  -->
```

**example**
```md
<!-- VDOCS.badges travis({branch:master}), standard, npm -->
```

produces

```md
[![Build Status](https://travis-ci.org/vigour-io/docs.svg?branch=master)](https://travis-ci.org/vigour-io/docs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-docs.svg)](https://badge.fury.io/js/vigour-docs)
```

#### Available badges

- `travis({branch:<branch>})`
- `standard`
- `npm`
- more coming soon, stay tuned!

### [jsdoc]()
```md
<!-- VDOCS.jsdoc <filePath> <ID>  -->
```

- **filePath** : path to file with jsdoc-style comments
- **ID** : Identifier to find the desired comment block

**example**

```md
<!-- VDOCS.jsdoc lib/start.js 1 -->
```
Fetches the jsdoc-style comment block found in `lib/start.js` and containing `@id 1`, converts it to github-flavoured markdown, and replaces the placeholder with the result
