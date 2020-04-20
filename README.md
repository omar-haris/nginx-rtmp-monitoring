# fstv-monitoring
real-time monitoring dashboard for nginx rtmp module

![fstv monitoring](https://cloud.githubusercontent.com/assets/16119345/15388844/9f66917e-1dbc-11e6-9726-2a4912d74352.png)

# How to install

first you must installed @nginx-rtmp-module

and you need to install nodejs , npm and git .


* open nginx config file and add at http -> server section put this code


        location /stat {
            rtmp_stat all;
            rtmp_stat_stylesheet stat.xsl;
        }

        location /stat.xsl {
	    root html;
        }

	    location /control {
	        rtmp_control all;

	        # Enable CORS
	        add_header Access-Control-Allow-Origin * always;
	    }

* move stat.xsl file to main html folder of ningx

* go to your home folder in your server

	git clone https://github.com/fiftysoft/nginx-rtmp-monitoring.git

* cd to nginx-rtmp-monitoring folder 

* Edit config.json file with the path of your RTMP server 

* run :

	npm install

* start nodejs server

	node server.js

* open http://your-server-ip-address:9991 on your browser
    Default credentials for login:
    Username: admin
    Password: 123123

* you can use logout button for sign out

Note // please change username , session secret and password from config.json


## how to get help
you can send me on twitter https://twitter.com/3m1oo 
or open issue at github


# Docker

        docker-compose up

Alternatively build and run the container yourself:

        docker build -t nginx-rtmp-monitoring . && docker run -it --rm -p 9991:9991 nginx-rtmp-monitoring
	

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
