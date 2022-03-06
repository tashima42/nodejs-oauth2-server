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
<a id='top'></a>
# Table of Contents

1. [Installation and Setup](#install)
1. [Flow](#flow)

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


## Flow

This OAuth2.0 implementation is meant to be a example for [Toolbox CloudPass](https://toolboxdigital.atlassian.net/wiki/spaces/DDP/pages/72293671/CloudPass+Integration+Guide+method+OAuth+2.0+Protocol) integrations. So it follows the standard flow described in the documentation.

![flow](https://toolboxdigital.atlassian.net/wiki/download/thumbnails/72293671/Flujo%20de%20autenticaci%C3%B3n%20Oauth2.jpg?version=1&modificationDate=1569931404030&cacheVersion=1&api=v2&width=1108&height=1921)
![flow-notes](https://toolboxdigital.atlassian.net/wiki/download/thumbnails/72293671/Flujo%20de%20autenticaci%C3%B3n%20Oauth2.jpg?version=1&modificationDate=1569931404030&cacheVersion=1&api=v2&width=1108&height=1921)
