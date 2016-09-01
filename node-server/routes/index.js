var express = require('express');
var router = express.Router();
var cfenv = require("cfenv");
/* GET home page. */

router.get('/', function (req, res) {
    var appEnv = cfenv.getAppEnv();
    res.render('index', {
        instanceId: appEnv.app.instance_id,
        sessionId: req.session.id,
        title: 'Node server for authentication '
    });
});

module.exports = router;
