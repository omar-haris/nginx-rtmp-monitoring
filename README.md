# fstv-monitoring
 rtmp & hls server with real-time monitoring dashboard.

![fstv monitoring](https://cloud.githubusercontent.com/assets/16119345/15388844/9f66917e-1dbc-11e6-9726-2a4912d74352.png)

# How to install

- chmod +x setup.sh && ./setup.sh

- then open http://<server ip>:9991 on your browser
  
    Default credentials for login:
        Username: admin
        Password: 123123    

Note // please change username , session secret and password from config.json

# Testing the stream

    ffmpeg -re -i <replace your video file>.mp4 -vcodec libx264 -profile:v main -preset:v medium -r 30 -g 60 -keyint_min 60 -sc_threshold 0 -b:v 2500k -maxrate 2500k -bufsize 2500k  -sws_flags lanczos+accurate_rnd -acodec aac -b:a 96k -ar 48000 -ac 2 -f flv rtmp://<server ip>:1935/stream/hello

# Watch Stream
In Safari, VLC or any HLS player, open:

http://<server ip>:8080/live/$STREAM_NAME.m3u8

Example Playlist: http://<server ip>:8080/live/hello.m3u8

VideoJS Player

FFplay: ffplay -fflags nobuffer rtmp://<server ip>:1935/stream/hello

## how to get help
you can send me on twitter https://twitter.com/3m1oo

# License

MIT License

Copyright (c) 2016 3m1o

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
