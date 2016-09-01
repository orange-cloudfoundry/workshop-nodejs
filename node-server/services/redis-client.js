var redisConfiguration = require('./redis-configuration')();
var redis = require('redis');

module.exports = redis.createClient({
    host: redisConfiguration.host,
    port: redisConfiguration.port,
    password: redisConfiguration.password
});
