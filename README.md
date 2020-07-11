<p align="center">
  <h1 align="center">Stocks Assesment</h1>

  <p align="center">
    Project Create with the Stack MERN
    <br>
    <br>
    <a href="https://stocks-assesment-atc.herokuapp.com/" target="_blank">Live Demo</a>
    .
    <a href="https://github.com/AnthonyTC89/stocks-assesment/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnthonyTC89/stocks-assesment/issues">Request Feature</a>
  </p>
</p>

![Screenshot](/screenshots/01.png)
![Screenshot](/screenshots/02.png)

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Installation](#installation)
* [Docker](#docker)
* [Scripts](#Scripts)
* [Future Features](#Future-Features)
* [Contact](#Contact)

<!-- ABOUT THE PROJECT -->
## About The Project

A web portal to manage stocks. It's include adding, deleting, updating and listing of stocks.

### Built With
* [HTML](https://www.w3.org/html/)
* [CSS](https://www.w3.org/Style/CSS/)
* [JavaScript](https://www.javascript.com/)
* [React](https://reactjs.org/)
* [Material-IU](https://material-ui.com/)
* [Node](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Pre-Installation
  1. npm version 6.14.5 or more
  2. node version 8.17.0 or more

### Installation
  1. clone the repository [stocks-assesment](https://github.com/AnthonyTC89/stocks-assesment)
  2. cd in to the folder and run `npm install`
  3. run `npm build` to have all the files from the react-app.
  4. create the file `.env` in the root with the next Variables:
    + USERNAME_MONGODB=admin
    + PASSWORD_MONGODB=admin
  5. run `npm start`
  6. go to [localhost:3001](http://localhost:3001)

### Docker

  1. run `docker pull anthonytc89/stocks-assesment`
  2. run `docker run -d -p 4000:3001 stocks-assesment`

### Scripts

  1. `npm start`: Start the app with node.js, express, mongodb with the result of the react built.
  2. `npm react`: Start only the react app without the back-end.
  3. `npm build`: Create the main files of the front-end.
  4. `npm test`: Check the test files of the react app.
  5. `npm dev`: Similar of "npm start" running with nodemon.

### Contact

* **[Anthony Tapia Cossio](https://github.com/AnthonyTC89) - [Linkedin](linkedin.com/in/anthony-tapia-cossio) - [Twitter](https://twitter.com/ptonypTC) - [Portfolio](https://portfolio-anthony.herokuapp.com/)**
