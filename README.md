# File reader

## Instructions

* Clone repository
* cd into the downloaded folder
* run `yarn install` to install dependencies
* run `yarn dev`to start development server

## Routes

* `/list` - returns JSON formatted object with file names and active status
* `/scan` - scans the same folder for changes in files and marks removed files as inactive
* `/download-state` - sends `.json` file with current state

## Used stack

* express
* typescript
* redux/redux-toolkit
