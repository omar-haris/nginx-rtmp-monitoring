function drop_publisher(app_name, stream_name) {
    var control_server = $("#control_server").val() + "/drop/publisher?app=" + app_name + "&name=" + stream_name;
    console.log('drop: ' + stream_name + ' from URL:' + control_server);

    var jqxhr = $.get(control_server, function (data, status) {
        console.log('Status: ' + status + ' Data: ' + data);
    });

}

function dropStreamEvent() {

    $(".drop_stream").click(function () {
	    var stream_name = $(this).attr('data-stream-name');

	    $("#stream_drop_popup").modal('show');

	    $("#modal-btn-yes").on("click", function () {
	        drop_publisher("live", stream_name);
	        $("#stream_drop_popup").modal('hide');
	    });

	    $("#modal-btn-no").on("click", function () {
	        $("#stream_drop_popup").modal('hide');
	    });
    });
}

function playStreamEvent() {

    var $player;

    $(".play_stream_rtmp").click(function () {

        var stream_name = $(this).attr('data-stream-name');

        var stream_server = $("#rtmp_stream_server").val();

        $("#player").html('<video id="PlayStream" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="560px" height="330px" data-setup="{}"> <source src="' + stream_server + stream_name + '"/> <p class="vjs-no-js">To view this video please enable JavaScript</p> </video>');

        $player = videojs("PlayStream");

        $player.ready(function () {
            $player.pause();
            $player.load();
        });

        $("#channel_name").html(stream_name);

    });

    $(".play_stream_hls").click(function () {

        var stream_name = $(this).attr('data-stream-name');

        var stream_server = $("#hls_stream_server").val();

        $("#player").html('<video id="PlayStream" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="560px" height="330px" data-setup="{}"> <source src="' + stream_server + stream_name + '.m3u8"/> <p class="vjs-no-js">To view this video please enable JavaScript</p> </video>');

        videojs.Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjsInstance) => {});

        $player = videojs("PlayStream",{ html5: { hlsjsConfig: {} }});

        $player.ready(function () {
            $player.pause();
            $player.load();
        });

        $("#channel_name").html(stream_name);

    });

    $('#stream_popup').on('hidden.bs.modal', function () {
        if(videojs.getPlayers()["PlayStream"]) {
	    delete videojs.getPlayers()["PlayStream"];
	}
    })


}
