<p align="center">
  <img width="200" height="200" src="images/project-logo.jpeg">
</p>

## Interview Tool

![Build](https://github.com/Frankeo/interview-challenges/workflows/Build/badge.svg)
![Publish](https://github.com/Frankeo/interview-challenges/workflows/Publish/badge.svg)
![CodeQL](https://github.com/Frankeo/interview-challenges/workflows/CodeQL/badge.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/frankeo/interview-tool/badge)](https://www.codefactor.io/repository/github/frankeo/interview-tool)
![Coverage Status](https://img.shields.io/coveralls/github/Frankeo/interview-challenges)
[![Dependabot](https://api.dependabot.com/badges/status?host=github&repo=Frankeo/interview-challenges)](https://dependabot.com)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

---

<p align="center">
This repo contains a CLI tool for create, save and deploy exercises for
interviews.
</p>

## :pencil: Table of Contents

- [About](https://github.com/Frankeo/interview-challenges#-about)
- [Getting Started](https://github.com/Frankeo/interview-challenges#-getting_started)
- [Usage](https://github.com/Frankeo/interview-challenges#-usage)
- [Deployment](https://github.com/Frankeo/interview-challenges#-deployment)
- [Built Using](https://github.com/Frankeo/interview-challenges#-built_using)
- [New Features](https://github.com/Frankeo/interview-challenges#-todos)
- [Authors](https://github.com/Frankeo/interview-challenges#-authors)

## :mag: About

The main idea is to have a collection of easy to extract **interview code
challenges** and being able to deploy them into
[codesandbox](https://codesandbox.io).

The **CLI (interview-tool)** let you create a new project with the next
[scaffolding](), so you don't start form scratch!

Also, let you add/save already started projects to your interview list,
following this [criteria]().

All the projects into your **interview list** are able to be deploy! you have
multiple [criteria selection](), even a random one for avoiding favoritism
problems! 😎

## :checkered_flag: Getting Started

### Prerequisites

For using this CLI, needs to be installed:
![NodeJS](https://img.shields.io/node/v/interview-tool?style=for-the-badge)

### Installation

Only need to run

```
npm install -g interview-tool
```

And that's it!! 🥳

### Debugging

- 1º Download the project and install the packages inside the project folder

```
cd interview-challenges/
npm i
```

- 2º Inside the project folder you need to create a **linksymb** to be able to
  run the tool globally

```
npm link
```

- 3º Go to another location (one folder back is enough!) and check if the
  command **interview-tool** is available.

- 4º **That's all!** Your code changes are going to take effect over the
  commands executed by the tool! 🤓

## :balloon: Usage

For a more [detailed documentation and examples]()

```
interview-tool <command>
```

- `add <folderName>`: Name of the folder containing the repo that you want to
  upload.

- `list`: Get all the exercises available

- `create <projectName>`: Create a new project folder to work in locally.

- `deploy [-p] [-t] [-d] [noTests]`: Deploy to CodeSandbox by projectName, Topic
  or Difficulty

- `completion`: Follow the instructions to get autocompletion CLI tool.

## :rocket: Deployment

Github Actions for creating a [npm](https://www.npm.org) package

![Version](https://img.shields.io/github/package-json/v/Frankeo/interview-challenges)
![ReleaseDate](https://img.shields.io/github/release-date/Frankeo/interview-challenges)
![Size](https://img.shields.io/bundlephobia/min/interview-tool)
![Downloads](https://img.shields.io/npm/dm/interview-tool)
![Last commit](https://img.shields.io/github/last-commit/Frankeo/interview-challenges)

## :pick: Built Using

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Yargs](http://yargs.js.org/) - Command Parser
- [CodeSandbox](https://codesandbox.io) - Exercise release environment
- [SQLite](https://www.sqlite.org/index.html) - Local exercise DB

## :crossed_fingers: New Features

:heavy_check_mark: Adding more unit testing.

:white_large_square: Manual Testing on Windows.

:white_large_square: Manual Testing on Linux (Ubuntu and Debian).

:heavy_check_mark: Adding better log information.

:white_large_square: Adding support for generate document on readme (to PDF
format) in every internal project.

:heavy_check_mark: Check project status before saving.

:white_large_square: Avoid adding duplicated projects

:heavy_check_mark: Setting **Dependabot** for the project.

:white_large_square: Create Integration test for avoid repeat manual testing
over different OS.

:white_large_square: Install **Eslint** and define Standard.

:heavy_check_mark: Define **License** for the project.

:white_large_square: Add multiple projects in batch when contained in the same
folder.

:white_large_square: Install **Husky** for prepush and avoid upload wrong code.

:white_large_square: Adding **Changelog** tracking in user documentation.

:white_large_square: Track Analytics usage of the CLI.

:white_large_square: Create Github Page for user Documentation.

:white_large_square: Create Wiki for developer easy rampage.

## :writing_hand: Authors

- [Francisco Moreno](https://github.com/Frankeo) - Idea & Initial work

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://tnovau.github.io"><img src="https://avatars1.githubusercontent.com/u/18268934?v=4" width="100px;" alt=""/><br /><sub><b>Tomás Novau</b></sub></a><br /><a href="https://github.com/Frankeo/interview-challenges/pulls?q=is%3Apr+reviewed-by%3Atnovau" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
