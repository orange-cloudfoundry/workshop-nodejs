var serviceName = /.*redis.*/;
var cfenv = require("cfenv");


var redisConfiguration = function () {
    var config = {
        host: 'localhost',
        port: 6379,
        password: ''
    };
    var appEnv = cfenv.getAppEnv();
    var serviceCreds = appEnv.getServiceCreds(serviceName);
    if (!process.env.hasOwnProperty("VCAP_SERVICES") || serviceCreds == null) {
        return config;
    }
    config.host = serviceCreds.host;
    config.port = serviceCreds.port;
    config.password = serviceCreds.password;
    return config;
};

module.exports = redisConfiguration;