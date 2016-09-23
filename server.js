var express = require("express");
var fetchUrl = require("fetch").fetchUrl;
var parseString = require('xml2js').parseString;
var config = require('./config.json');
var language = require('./language/'+config.language+'.json');
var app = express();
app.use(express.static('public'));
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

app.get('/',function(req,res){
   res.render(config.template,{
        title: config.site_title,
        language: language,
        version:config.version,
        stream_server:config.rtmp_server_stream_url
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
            var str = data.toString()
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

  fetchUrl(config.rtmp_server_url,{timeout:config.rtmp_server_timeout},function(error, meta, xml){

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







