# example-microservice

You can run client.js or list.js to see how the RPC calls work and simulate a client calling the microservice

to run the server node server.js

#notes

#This needs to run on Elasticsearch 5.0

We only using decode right now in jwt this isn't perfectly safe.
Later we need to get jwt.verify to work correctly -

By using:

https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com

This is just an example skeleton template which shows how to build a microservice.  Use redis for RPC for microservices to communicate with each other and stores and retrieves information from elasticsearch

The code here is just an example of how I developed microservices and use databases like firebase, elasticsearch and redis to build the components.



