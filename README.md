<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Interview Code Challenge</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This repo contains a list of already resolved and simple exercise for technical interviews.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage and Extension](#usage)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)
- [New Features](#todos)

## 🧐 About <a name = "about"></a>

The main idea is to have a collection of easy to extract interview katas and being able to deploy into codesandbox.io.

For achieving this goal, this repo is going to be a **Tool (Interview CLI)**, in which you are going to be able to choose a project (with or without test already resolved), or pick certain level of difficulty or duration criteria and the tool chooses a random kata and deploy it.

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

For running this repository, you only need **Node Js**

### Installing

First, you need to download the project and install the packages
```
npm i
```
Second, inside the project folder you need to create a linksymb to be able to run the tool globally 
```
npm link
```
Third, go to another location (one folder back is enough) and check if the command **interview-tool** is available.

## 🎈 Usage and Extension <a name="usage"></a>

```
interview-tool -p {project-name} [--with-tests]
```

- **project-name**: Name of the folder/kata project inside the tool directory that you want to deploy.

- **--with-tests**: optional paramter to indicate that you want to deploy a project with tests already resolved, default value: **false**.

- [X] Already implemented

### Draft

```
interview-tool -d {difficulty-level} | -t {estimated-duration} [--with-tests]
```

Difficulty Levels:


## 🚀 Deployment <a name = "deployment"></a>

Add Github actions for running every little project tests.
- [ ] NOT implemented

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [Francisco Moreno](https://github.com/Frankeo) - Idea & Initial work

## New Features <a name = "todos"></a>

- [ ] Split the logic into multiple files.
- [ ] Adding more testing.
- [ ] Adding github actions for building the solution.
- [ ] Creating and publish package as npm global for usage.
- [ ] Adding functionality for adding from console new projects base on file for code and file for tests.
