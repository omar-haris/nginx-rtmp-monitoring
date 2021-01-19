#!/usr/bin/env sh

OS=`uname`
# $(replace_in_file pattern file)
function replace_in_file() {
    if [ "$OS" = 'Darwin' ]; then
        # for MacOS
        sed -i '' -e "$1" "$2"
    else
        # for Linux and Windows
        sed -i'' -e "$1" "$2"
    fi
}

#find host ip address
ip=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')

#generate session key
key=$(openssl rand -hex 32)

#configure the dashboard
$(replace_in_file 's,rtmp_server_url.*,rtmp_server_url\":'"\"http://$ip:8080/stat.xml"\"'\,,' "config.json")
$(replace_in_file 's,rtmp_server_stream_url.*,rtmp_server_stream_url\":'"\"rtmp://$ip:1935/live/"\"'\,,' "config.json")
$(replace_in_file 's,rtmp_server_control_url.*,rtmp_server_control_url\":'"\"http://$ip:8080/control"\"'\,,' "config.json")
$(replace_in_file 's,hls_server_stream_url.*,hls_server_stream_url\":'"\"http://$ip:8080/live/"\"'\,,' "config.json")
$(replace_in_file 's,session_secret_key.*,session_secret_key\":'"\"$key"\"'\,,' "config.json")

#start the contrainers
docker-compose up --build -d
