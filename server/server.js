/**
 * Created by lcm on 2016/10/4.
 */
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});
wss.on('connection', function(client) {
    client.on('message', function(message) {
        console.log('received: %s', message);
        try{
            var obj = JSON.parse(message);
            if(obj.type == 'plus') {
                var a = obj.data[0];
                var b = obj.data[1];
                var c = plus(a, b);
                client.send(c);
            }
        }catch (e){
            console.log(e);
        }
    });
    //client.send('something');
});

function plus(a, b) {
    var t1 = [], t2 = [];
    var i;
    //console.log(a.length);
    for(i=a.length-1;i>=0;i--) {
        t1.push(a[i] - '0');
    }
    for(i=b.length-1;i>=0;i--) {
        t2.push(b[i] - '0');
    }
    while(t1.length!=t2.length) {
        if(t1.length > t2.length) {
            t2.push(0);
        } else {
            t1.push(0);
        }
    }
    var len = t1.length;
    t1.push(0);
    for(i=0;i<len;i++) {
        t1[i] = t1[i] + t2[i];
    }
    for(i=0;i<len;i++) {
        t1[i+1] += Math.floor(t1[i] / 10);
        t1[i] = t1[i] % 10;
    }
    if(t1[len] > 0 ) len++;

    var res = "";
    for(i=len-1;i>=0;i--) {
        res += t1[i];
    }
    return res;
}