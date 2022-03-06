```
  ___    _         _   _       ____    ___  
 / _ \  / \  _   _| |_| |__   |___ \  / _ \
| | | |/ _ \| | | | __| '_ \    __) || | | |
| |_| / ___ \ |_| | |_| | | |  / __/ | |_| |
 \___/_/   \_\__,_|\__|_| |_| |_____(_)___/
```
# Disclaimers: 
* **NEVER** use this in production, this implementation **INSECURE**, but it's a good start point to understand how OAuth 2.0 works
* This implementation is loosely based on [14gasher/oauth-example](https://github.com/14gasher/oauth-example). Most things are different, but the initial idea and the starting point comes from his project.

# Table of Contents

1. [Documentation](#documentation)
1. [Installation and Setup](#installation-and-setup)
1. [File Structure](#file-structure)

## Documentation

This OAuth2.0 implementation is meant to be an example for Toolbox CloudPass. Follow the official documentation for more detailed instructions.
https://toolboxdigital.atlassian.net/wiki/spaces/DDP/pages/72293671/CloudPass+Integration+Guide+method+OAuth+2.0+Protocol

![flow](https://toolboxdigital.atlassian.net/wiki/download/thumbnails/72293671/Flujo%20de%20autenticaci%C3%B3n%20Oauth2.jpg?version=1&modificationDate=1569931404030&cacheVersion=1&api=v2&width=1108&height=1921)

## Installation and Setup

1. Clone this Repo
1. Go to project folder `cd oauth2-poc`
1. Install the dependencies `npm install`
1. Prepare the database
    1. Run the migrations `npm run db:migrate`
    1. Populate the database `npm run db:populate`
1. Start the server
    * Run in development mode `npm run dev`
    * Run in "production" (you shouldn't run this in production) mode `npm run start`

## File Structure
* [**Entrypoint**: src/index.ts](https://github.com/Tashima42/oauth2-poc/blob/master/src/index.ts) This is where the express server is started and the middlewares are registered
* [**Routes**: src/routes.ts](https://github.com/Tashima42/oauth2-poc/blob/master/src/routes.ts) Where the endpoints are registered, what the client will interact with
* [**Use-Cases**: src/use-cases](https://github.com/Tashima42/oauth2-poc/tree/master/src/use-cases)
   * [**DTO**](https://github.com/Tashima42/oauth2-poc/blob/master/src/use-cases/authorize-user/authorize-user-DTO.ts): Data Transfer Object, a interface that defines the input and output data for the use-case
   * [**use-case**](https://github.com/Tashima42/oauth2-poc/blob/master/src/use-cases/authorize-user/authorize-user-use-case.ts): All the business logic lives here, the rules that defines how the data will flow.
   * [**controller**](https://github.com/Tashima42/oauth2-poc/blob/master/src/use-cases/authorize-user/authorize-user-controller.ts): Treats the input and output data from the http server to the interface agnostic use-case class. This means that the use-case doesn't know where the data comes from, it doesn't care, so the controller makes all the work to treat the data before ingesting them into where the business logic lives.
   * [**index**](https://github.com/Tashima42/oauth2-poc/blob/master/src/use-cases/authorize-user/index.ts): Instantiates all the classes in one centralized place to help with code organization
* [**Repositories** src/repositories](https://github.com/Tashima42/oauth2-poc/tree/master/src/repositories): All the database reads and writes goes through here.
  * [Repository Interface](https://github.com/Tashima42/oauth2-poc/blob/master/src/repositories/IAuthorizationCodeRepository.ts): Defines the methods and arguments for the database interactions.
  * [Implementations](https://github.com/Tashima42/oauth2-poc/tree/master/src/repositories/implementations/Sqlite): The concrete implementation for the declared methods in the interfaces
* [**Interfaces** src/interfaces](https://github.com/Tashima42/oauth2-poc/tree/master/src/interfaces): The interfaces for the main objects used in the application
* [**Helpers** src/helpers](https://github.com/Tashima42/oauth2-poc/tree/master/src/helpers): Helpers for the use-cases.
