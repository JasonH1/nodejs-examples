var env = process.env.CURRENT_ENV || 'DEV';


module.exports = {
  //env: env,
  env: 'DEV',
  host: 'localhost', // redis server hostname 
  port: 6379, // redis server port 
  auth: '', // optional password 

  ELASTICSEARCH_PREFIX: 'mypets_',
  ELASTICSEARCH_BASE_URL: '81ed2ffc4b40b41aee0720a0805f386c.us-east-1.aws.found.io:9243',
  ELASTICSEARCH_USERNAME: 'elastic',
  ELASTICSEARCH_PASSWORD: '3KtGXlR6rLq7msGEV5DKXz0q',

};
