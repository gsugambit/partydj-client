# Party DJ ReactJS Client

Party DJ is an application being developed on stream by [GSUGambit](https://twitch.tv/GSUGambitCodes). This WebApp will
allow multiple users to queue up songs and have the app play them in order. We all hate to be the host of a kickback and be
responsible for playing all the music. PartyDJ allows you and friends to all queue up your favorite songs/videos and watch together.
This application will work if all users are locally on wifi or be deployed to the cloud and work for discord calls etc.

# Running Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Create .env file

First create a `.env` file from the template\
`cp .env.template .env`

Update the REACT_APP variable to have the `protocol://ip:port` of your running partydj-server

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.W

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Docker Runtime

If you would like, you can now run the docker container instead of installing \
dependencies and running this app on your local machine

### Docker build

If you have not created the docker network before, run the following command
`docker network create partydj_network`

Now you can build the docker image locally and create
`docker build -t gsugambit/partydj-client .`
`docker-compose up -d`

the application will run on `http://localhost:19192`

The docker compose file is expecting `partydj-server` to be run on same docker \
network. If you are running the server in a different way override the
`PARTYDJ_SERVER_DOMAIN` property
