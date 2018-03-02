var express = require("express");
var session = require('express-session');
var request = require('request');
var bodyParser = require('body-parser');
var parseString = require('xml2js').parseString;
var config = require('./config.json');
var language = require('./language/'+config.language+'.json');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
var server = app.listen(config.http_server_port);
var io = require('socket.io').listen(server);
var os = require("os");
var swig = require('swig');
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/template/');


function customHeaders( req, res, next ){
    app.disable( 'x-powered-by' );
    res.setHeader( 'X-Powered-By', "fstv monitoring "+config.version );
    next()
}

app.use(customHeaders);

app.use(session({
    secret: config.session_secret_key,
    resave: true,
    saveUninitialized: true
}));

var auth = function (req, res, next) {
    if (req.session && req.session.user === "fstn" && req.session.admin) {
        return next();
    }
    else {
        res.redirect("/login");
    }
};

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/login");
});

app.post('/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.redirect("/login?error=empty");
    }

    if (req.body.username === config.username && req.body.password === config.password) {
        req.session.user = "fstn";
        req.session.admin = true;
        return res.redirect("/");
    }
    return res.redirect("/login?error=wrong");
});

app.get('/login', function (req, res) {
    res.render(config.login_template, {
        title: config.site_title,
        language: language,
        error: req.query.error
    });
});

app.get('/',auth,function(req,res){
   res.render(config.template,{
        title: config.site_title,
        language: language,
        version:config.version,
        stream_server:config.rtmp_server_stream_url,
        control_server:config.rtmp_server_control_url
   });
});

app.get('*', function(req, res){
    res.redirect('/');
});

function cpuAverage() {
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
    for(var i = 0, len = cpus.length; i < len; i++) {
        var cpu = cpus[i];
        for(type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    }
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}
var startMeasure = cpuAverage();


setInterval(function(){

    setTimeout(function() {
        var endMeasure = cpuAverage();
        var idleDifference = endMeasure.idle - startMeasure.idle;
        var totalDifference = endMeasure.total - startMeasure.total;
        var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
        var spawn = require('child_process').spawn;
        var prc = spawn('free',  []);
        var used_memory = 0;
        prc.stdout.setEncoding('utf8');
        prc.stdout.on('data', function (data) {
            var str = data.toString();
            var lines = str.split(/\n/g);
            for(var i = 0; i < lines.length; i++) {
                lines[i] = lines[i].split(/\s+/);
            }
            used_memory = lines[1][2];
            io.emit('server', {
                used_cpu:percentageCPU,
                used_memory:used_memory
            });
        });
    }, 100);

    request.get(config.rtmp_server_url,{timeout:config.rtmp_server_timeout},function(error, meta, xml){

    if(error) {
        io.emit('error', {"error":true});
    }

    parseString(xml,function (err, result) {

    	if(err != null)
    	{
    		io.emit('error', {"error":true});
    	}else{
    		io.emit('error', {"error":false});
    	}

        if(err != null)
        {
            io.emit('statistics', result);
        }else{
            io.emit('statistics', result.rtmp);
        }

    });

  });

},config.rtmp_server_refresh);
