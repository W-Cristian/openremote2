# General Explanation

This project consists of creating a tool that allows a user to enter data in a more friendly way to the [Openremote](https://github.com/openremote/Documentation/wiki) application and specifically aims at the data entry of the [Netatmo](https://dev.netatmo.com/apidocumentation/weather) and [Gardena](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API) APIs.

## how to run?

In the project directory(**node.js needed**), you must run the following command in this order

>to install dependencies:

>### `npm install`

>to run de App:

>### `npm start`

Runs the app in the development mode.This is configurate to run with **secure** protocol.

you have to manually enter  [https://localhost:3000](https://localhost:3000) to view the app in your browser.

## Build docker image and run it

Having docker installed on the system you can run the application easily by running the following commands in the root folder of the project (where the **Dockerfil** is)

### `docker build . -t openremote2`
### `docker run --publish 3000:3000 openremote2`