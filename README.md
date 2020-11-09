<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Interview Code Challenge</h3>

<div align="center">

![CI build](https://github.com/Frankeo/interview-challenges/workflows/CI%20build/badge.svg)
![Package CD](https://github.com/Frankeo/interview-challenges/workflows/Package%20CD/badge.svg)
![Coverage Status](https://img.shields.io/coveralls/github/Frankeo/interview-challenges)
![License](https://img.shields.io/github/license/Frankeo/interview-challenges)
![Last commit](https://img.shields.io/github/last-commit/Frankeo/interview-challenges)
</div>

---

<p align="center"> This repo contains a CLI tool for create, deploy and save a exercises for interviews.
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

For achieving this goal, this repo is going to be a **CLI (interview-tool)**, in which you are going to be able to choose a project (with or without tests already resolved), or pick certain level of difficulty or topic as criteria and the tool chooses a random kata and deploy it.

You also are going to be able to create new template projects and later on adding to the collection of already resolved tests.

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

For running this repository, you only need **Node Js**

### Installation

Only need to run 
```
npm install -g interview-tool
```
And that's it!!

### Debugging

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
interview-tool <command>
```

- ```add <folderName>```: Name of the folder containing the repo that you want to upload

- ```list```: Get all the katas/exercise available

- ```create <projectName>```: Create a new project folder to work in locally.

- ```deploy [-p] [-t] [-d]```: Deploy to CodeSandbox by projectName, Topic or Difficulty

- ```completion```: Follow the instructions to get autocompletion CLI tool.

## 🚀 Deployment <a name = "deployment"></a>

Github Actions for package it into npm.org

![Version](https://img.shields.io/github/package-json/v/Frankeo/interview-challenges)
![Repo Release](https://img.shields.io/github/release-date/Frankeo/interview-challenges)
![Repo Size](https://img.shields.io/github/repo-size/Frankeo/interview-challenges)

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Yargs]() - Command Parser
- [CodeSandbox]() - Exercise release environment
- [SQLite]() - Local exercise DB

## ✍️ Authors <a name = "authors"></a>

- [Francisco Moreno](https://github.com/Frankeo) - Idea & Initial work

## New Features <a name = "todos"></a>

- [X] Adding more unit testing.
- [ ] Testing on Windows.
- [X] Adding better log information.
- [ ] Adding support for generate document on readme (to PDF format) in every internal project.
- [X] Check project status before saving.
- [ ] Avoid adding duplicated projects
- [ ] Define general standards.
- [ ] Adding a better documentation and README