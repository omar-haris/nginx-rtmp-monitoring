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


* move stat.xsl file to main html folder of ningx 

* go to your home folder in your server 

	git clone https://github.com/fiftysoft/nginx-rtmp-monitoring.git
	
* cd to nginx-rtmp-monitoring folder run :

	npm install
	
* start nodejs server

	node server.js
	
* open your borwser http://ip:9991


any help ask me at https://www.facebook.com/khdevelopment
