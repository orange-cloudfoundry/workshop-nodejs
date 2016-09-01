var express = require('express');
var router = express.Router();
var redisClient = require('../services/redis-client');

router.post('/', function (req, res) {
    if (!req.body.hasOwnProperty("user")
        || req.body.user == ""
        || !req.body.hasOwnProperty("password")
        || req.body.password == ""
    ) {
        res.status(400).json({
            message: "User or/and password not set"
        });
        return;
    }
    redisClient.hgetall("users", function (err, users) {
        if (users != null && users != undefined && users.hasOwnProperty(req.body.user)) {
            res.status(400).json({
                message: "User already exist"
            });
            return
        }
        redisClient.hmset("users", req.body.user, req.body.password);
        var user = {};
        user[req.body.user] = req.body.password;
        res.status(200).json(user);
    });
});

router.get('/', function (req, res) {
    if (!req.session.hasOwnProperty("user")) {
        res.status(401).json({
            message: "you're not logged"
        });
        return;
    }
    redisClient.hgetall("users", function (err, users) {
        if (err != null || users == null) {
            res.status(200).json({});
            return;
        }
        res.status(200).json(users);
    });
});
router.get('/:name', function (req, res) {
    if (!req.session.hasOwnProperty("user")) {
        res.status(401).json({
            message: "you're not logged"
        });
        return;
    }
    redisClient.hgetall("users", function (err, users) {
        if (err != null || users == null) {
            res.status(200).json({});
            return;
        }
        if (!users.hasOwnProperty(req.params.name)) {
            res.status(200).json({});
            return;
        }
        res.status(200).json(users[req.params.name]);
    });
});
module.exports = router;
