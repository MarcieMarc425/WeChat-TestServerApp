var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var crypto = require('crypto');

const port = 8081;

app.get('*', function(req, res) {
    // openid
    // res.send({
    //     openid: openid 
    // })
    // console.log('received request...');
    // var appID = 'wxb5938a6e8e1cdfcf';
    // var appSecret = '1c5d260657f55c8b47d4d810e6eb96dc';
    // var code = req.code;
    // console.log(req.data);
});

io.on('connect', socket => {
    console.log('a user has connected');
    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
    socket.on('login', res => {
        var appID = 'wxb5938a6e8e1cdfcf';
        var appSecret = '1c5d260657f55c8b47d4d810e6eb96dc';
        var code = res;
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appID + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';
        console.log(code);
        request(url, (error, response, body) => {
            if(error)
                console.log(error)
            else {
                var resPkg = JSON.parse(body);
                console.log(resPkg.openid);
                console.log(resPkg.session_key);
            }
        })
    });
});

// test.qq.com/login?code=dafafa
http.listen(port, () => {
    console.log('listening on port ' + port);
});

// function getSessionKey (code, appid, appSecret) {
//     var opt = {
//         method: 'GET',
//         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
//         params: {
//             appid: appid,
//             secret: appSecret,
//             js_code: code,
//             grant_type: 'authorization_code'
//         }
//     }

//     return http(opt).then(function (res) {
//         var data = res.data;
//         if(!data.openid || !data.session_key || data.errcode) {
//             return {
//                 result: -2,
//                 errmsg: data.errmsg || '返回数据字段不完整'
//             }
//         } else
//             return data
//     });
// }

// const crypto = require('crypto');

// return getSessionKey(code, appid, secret).then(resData => {
//     const {session_key} = resData;
//     const eKey = encryptSha1(session_key);
// });

// function encryptSha1(data) {
//     return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
// }