# A Simple Weather App Client

![Image of react-weather-client](https://i.imgur.com/7hPloxZ.png)

This app enables a user to input a valid US zip code and city and will return some basic weather data for that location

Users should create an account by signing up, and then they will be able to add different cities and check their weather data.  The app will request the weather data from a third party API, more information about the third party API can be found on their website: https://openweathermap.org/api

Please note the third party API weather data only refreshes once every 10 minutes, so it not recommended to request data more than once every 10 minutes.

## Setup instructions

Install dependencies with `npm install`

## Links

### Front-end

Front-end Repo: https://github.com/rypatel126/react-weather-client
Front-end deployed link: https://rypatel126.github.io/react-weather-client

### Back-end

Back-end Repo: https://github.com/rypatel126/rails-weather-api
Back-end deployed link: https://fathomless-lake-22722.herokuapp.com/

## Technologies Used

React.js
React Bootstrap

## Unsolved Problems

In future versions, the zipcode which is inputted will be checked against the third party API to make sure it is valid and the data is available, as it currently stands, a user can input any random 5 digits as the zip code and save the city, but no data will be displayed.  Users will also be able to view weather data based city name, so they will not need to input a zipcode at all, and also for cities outside of the US.  Users will also be able to view all the weather data without having to select a particular city first, so all the cities a user has added will be populated on the home screen after they log in, and they will be able to view multiple cities' weather data at the same time.  As it stands, the current third party API only accepts 60 requests a second, so it is not feasible using their free API key.

## Planning, Process and Problem Solving Strategy

I first began this project by creating some user stories and wireframes as a sketch of how I would like the app to look like.  I then created a back-end API to store user data, and a front-end client to render the appropriate data requested from a third party API

One major problem I encountered was requesting data from the third party API, which I solved by using nested axios calls so that the correct request data would be sent to the API.

## User Stories

- As a non signed-in user I want to be able to create an account and sign in
- As a signed-in user I want to be able to change my password and sign-out
- As a signed in user I want to be able to add a city to my account
- As a signed in user I want to be able to view weather data for a city I have added to my account
- As a signed in user I want to be able to edit a city's information
- As a signed in user I want to be able to delete a city from my account

## Wireframe

![Image of react-weather-client-wireframe](https://i.imgur.com/o2naCiR.png)
