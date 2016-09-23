var socket = io();

socket.on('reconnect',function() {
    system_success_message('Server is UP!');
});

socket.on('disconnect',function() {
    system_error_message("Server is down. ");
    system_is_down();
});

socket.on('connect',function() {
    system_is_live();
});

socket.on('error', function(data){
    if(data.error)
    {
        system_error_message("Please wait a little bit or contact technical support. ");
        system_is_down();
    }else{
        system_hide_message();
        system_is_live();
    }
});


var total_viewers_temp = {};
var bandwidth_in_per_sec_temp = {};
var bandwidth_out_per_sec_temp = {};
var monitor_statistics = 0;

socket.on('statistics', function(statistics){
    monitor_statistics++;

    var bandwidth_in_per_sec = statistics.bw_in[0];
    var bandwidth_out_per_sec  = statistics.bw_out[0];
    var total_bandwidth_in = byteToHuman(statistics.bytes_in[0]);
    var total_bandwidth_out = byteToHuman(statistics.bytes_out[0]);
    var up_time = secondsToHuman(statistics.uptime[0]);
    var total_viewers = statistics.server[0].application[0].live[0].nclients[0];
    var total_request = numeral(statistics.naccepted[0]).format('0.000 a');
    var stream = statistics.server[0].application[0].live[0].stream;

    setTotalViewers(numeral(total_viewers).format('0,0'));
    setBandwidthInPerSec(byteToHuman(bandwidth_in_per_sec)+"/s");
    setBandwidthOutPerSec(byteToHuman(bandwidth_out_per_sec)+"/s");
    setTotalBandwidthIn(total_bandwidth_in);
    setTotalBandwidthOut(total_bandwidth_out);
    setUpTime(up_time);
    setTotalRequest(total_request);
    setLiveStream(stream);


    if(monitor_statistics%2 == 0)
    {
        total_viewers_temp.up = total_viewers;
        bandwidth_in_per_sec_temp.up = bandwidth_in_per_sec;
        bandwidth_out_per_sec_temp.up = bandwidth_out_per_sec;

    }else{
        total_viewers_temp.down = total_viewers;
        bandwidth_in_per_sec_temp.down = bandwidth_in_per_sec;
        bandwidth_out_per_sec_temp.down = bandwidth_out_per_sec;

    }


    if(total_viewers_temp.up < total_viewers_temp.down )
    {
        increment("total_viewers_status");
    }else if(total_viewers_temp.up > total_viewers_temp.down) {
        decrement("total_viewers_status");
    }else{
        equal("total_viewers_status");
    }

    if(bandwidth_in_per_sec_temp.up > bandwidth_in_per_sec_temp.down )
    {
        increment("bandwidth_in_per_sec_status");
    }else if(bandwidth_in_per_sec_temp.up < bandwidth_in_per_sec_temp.down) {
        decrement("bandwidth_in_per_sec_status");
    }else{
        equal("bandwidth_in_per_sec_status");
    }


    if(bandwidth_out_per_sec_temp.up > bandwidth_out_per_sec_temp.down )
    {
        increment("bandwidth_out_per_sec_status");
    }else if(bandwidth_out_per_sec_temp.up < bandwidth_out_per_sec_temp.down) {
        decrement("bandwidth_out_per_sec_status");
    }else{
        equal("bandwidth_out_per_sec_status");
    }

});

var cpu_temp = {};
var ram_temp = {};
var monitor_server = 0;

socket.on('server', function(server){

    monitor_server++;

    var ram = server.used_memory;
    var cpu = server.used_cpu;

    setCpuUse(cpu+" %");
    setRamUse(byteToHuman(ram * 1024));


    if(monitor_server%2 == 0)
    {
        cpu_temp.up = cpu;
        ram_temp.up = ram;
    }else{
        cpu_temp.down = cpu;
        ram_temp.down = ram;
    }


    if(cpu_temp.up < cpu_temp.down )
    {
        increment("cpu_used_status");
    }else if(cpu_temp.up > cpu_temp.down) {
        decrement("cpu_used_status");
    }else{
        equal("cpu_used_status");
    }


    if(ram_temp.up < ram_temp.down )
    {
        increment("memory_used_status");
    }else if(ram_temp.up > ram_temp.down) {
        decrement("memory_used_status");
    }else{
        equal("memory_used_status");
    }

});



