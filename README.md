## Librarify - MongoDB version
The internet needs more '-ifys'.

## How to get this show on the road?
* Install Node (sudo apt-get install nodejs).
* Install mongoDB (sudo apt-get install mongodb).
* Run the first shellscript - start.sh (./start.sh) - will install dependencies, create missing files, and populate the database. 

## .. and how do I start this?
* Open two terminal windows or tabs
* Go into the server folder - run 'npm start'
* Go into the client folder - run 'npm start'

#### Everything is now up and running! (*Almost*) - If you only want the basic - less fun condition - then you can stop  right now.

## Getting the automatic image covers [official instructions](https://github.com/vadimdemedes/google-images)
Create Google Custom Search Engine (CSE) [here](https://cse.google.com/cse).
Do not select any specific site - use 'Restrict Pages using Schema.org Types' under 'Advanced options' - and use the Schema: 'Thing'.

Create a Google Custom Search Engine API [here](https://console.developers.google.com).
Create a new api key under *credentials*.

Go to the file located in /server/config/secret/Google-Api.js and paste in the keys you just obtained. 

## And now - you are golden.
