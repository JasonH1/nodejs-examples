// Client testing file

const createClient = require('node-rpc-redis/src/client')
const client = createClient('redis://pub-redis-17769.us-east-1-2.1.ec2.garantiadata.com:17769?password=MyPets11@z$!sq')

var _ = require('underscore');

// First connect to the Redis server
client.connect((connectionErr) => {
  if (connectionErr) {
    // Handle error and kill the process
  } else {

    const params = {
      func: 'listings.list',
      data: {
        from: 0,
        size: 2,
        status: 'active'
      }
    }

    // Call a routine on a remote service
    client.call('DEV.example.microservice', params, (callErr, result) => {
      if (callErr) {
        // handle error
        console.log('error: ', callErr);
      } else {
        console.log('result of RPC call', result)
      }
    })
  }
});