#!/bin/sh

echo 'Initializing Server'

cd server

echo 'Installing dependencies'

npm install

echo 'Dependencies installed'
echo 'Creating mongoURL'

echo "export default {
  connectionURL: 'mongodb://localhost:27017/librarifyDB'
}" >config/secret/Mongo.js

echo 'MongoURL created'
echo 'Populating DB'

npm run populate

echo 'Populating DB done'
echo 'Creating API file'

echo "export default {
	CSE: 'CSE-key',
	API: 'API-key'
}" >config/secret/Google-Api.js

echo 'API file created'

cd ..

echo 'Server initialized'
echo 'Initializing Client'

cd client
npm install
cd ..

echo 'Client initialized'
echo 'DONE.'
