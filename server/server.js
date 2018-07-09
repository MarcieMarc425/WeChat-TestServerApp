var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var uuid = require('uuid/v4');
var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

const port = 8081;

app.get('*', function (req, res) {});

var user = {
    openid: '',
    session_key: '',
    timeout: ''
}

var userHashMap = [];

io.on('connect', socket => {

    console.log('User has connected...');

    socket.on('login', res => {
        console.log('User is attempting to login');
        var appID = 'wxb5938a6e8e1cdfcf';
        var appSecret = '1c5d260657f55c8b47d4d810e6eb96dc';
        var code = res;
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appID + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';
        request(url, (error, response, body) => {
            if (error)
                console.log(error)
            else {
                console.log('User has successfully logged in.');
                var userObj = JSON.parse(body);
                this.uuid = uuid();
                userHashMap[this.uuid] = {
                    openid: userObj.openid,
                    session_key: userObj.session_key,
                    timeout: userObj.expires_in
                };
                userObj = null;
                socket.emit('login-success', this.uuid);
                console.log(userHashMap[this.uuid]);
            }
        });
    });

    socket.on('user-verify', () => {
        
    });

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
});

http.listen(port, () => {
    console.log('listening on port ' + port);
});