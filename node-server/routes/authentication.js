var express = require('express');
var redisClient = require('../services/redis-client');
var router = express.Router();


router.post('/login', function (req, res) {
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
        if (users != null && users != undefined && !users.hasOwnProperty(req.body.user)) {
            res.status(400).json({
                message: "User doesn't exist"
            });
            return;
        }
        if (users[req.body.user] != req.body.password) {
            res.status(400).json({
                message: "Wrong password"
            });
            return;
        }

        var user = {
            name: req.body.user
        };
        req.session.user = user;
        res.status(200).json(user);
    });
});
router.get('/disconnect', function (req, res) {
    delete req.session.user;
    res.status(200).json({
        message: "disconnected"
    });
});
router.get('/userInfo', function (req, res) {
    if (req.session.hasOwnProperty("user")) {
        res.status(200).json(req.session.user);
        return;
    }
    res.status(401).json({
        message: "you're not logged"
    });
});
module.exports = router;
