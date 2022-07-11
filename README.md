# nodejs-oauth2-server

## Quick overview:
You can start by using the [Postman Collection](https://www.postman.com/qrestoque/workspace/pedro-tashima-s-public-workspace/collection/13233153-c52c7618-7e33-48ab-b855-f0b54e27134e?action=share&creator=13233153)    
You should make requests in the order they are, there are automatic tests that will set the collection variables for you.

## Disclaimers: 
* **NEVER** use this in production, this implementation **INSECURE**, but it's a good start point to understand how OAuth 2.0 works
* This implementation is loosely based on [14gasher/oauth-example](https://github.com/14gasher/oauth-example). Most things are different, but the initial idea and the starting point comes from his project.

## Table of Contents

1. [How to understand this repository](#how-to-understand-this-repository)
1. [Documentation](#documentation)
1. [Installation and Setup](#installation-and-setup)
1. [File Structure](#file-structure)

## How to understand this repository
1. First, you should have a basic understanding of how Oauth2 works.
1. Look at the Postman Collection on the quick overview section and do some requests, try to understand how they compare to the sequence diagram below.
1. Go to the use-cases folder, and go folder by folder, in the same order as they are on the Postman Collection
1. Inside each folder, you should read first the DTO file, and understand what is the request and response objects for each request
1. To understand how the request parameters are used and how the response ones are generated, read the use-case file, which contains all the business logic

## Documentation

This OAuth2.0 implementation is meant to be an example for Toolbox CloudPass. Follow the official documentation for more detailed instructions.
https://toolboxdigital.atlassian.net/wiki/spaces/DDP/pages/72293671/CloudPass+Integration+Guide+method+OAuth+2.0+Protocol

![flow](https://toolboxdigital.atlassian.net/wiki/download/thumbnails/72293671/Flujo%20de%20autenticaci%C3%B3n%20Oauth2.jpg?version=1&modificationDate=1569931404030&cacheVersion=1&api=v2&width=1108&height=1921)

## Installation and Setup

1. Clone this Repo
1. Go to project folder `cd nodejs-oauth2-server`
1. Install the dependencies `npm install`
1. Prepare the database
    1. Run the database migrations and populate `npm run db:migrate:populate`
1. Start the tests `npm run test`
1. Start the server
    * Run in development mode `npm run dev`
    * Run in "production" (you shouldn't run this in production) mode `npm run start`

