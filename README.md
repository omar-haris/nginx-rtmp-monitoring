# fstv-monitoring
real-time monitoring dashboard for nginx rtmp module

![fstv monitoring](https://cloud.githubusercontent.com/assets/16119345/15388844/9f66917e-1dbc-11e6-9726-2a4912d74352.png)

# How to install

first you must installed @nginx-rtmp-module

and you need to install nodejs , npm and git .


* open nginx config file and add at http -> server section this code 

``

        location /stat {
            rtmp_stat all;
            rtmp_stat_stylesheet stat.xsl;
        }

        location /stat.xsl {
		      root html;
        }

``

