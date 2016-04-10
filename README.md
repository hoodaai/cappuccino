# cappuccino


Prototype developed for Placementloop.com. It contains a recruitment order entry system along with the order matching functionality.
## Technology Stack
- AngularJS
- NodeJS
- ExpressJS
- MongoDB
- ElasticSearch


## Installation

### Installing node

```
$ sudo apt-get install python-software-properties
Then, do this:

$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
Then, you have the latest version of node.js installed.

$ ln -s /usr/bin/nodejs /usr/bin/node
```

### Installing npm
```
$ sudo apt-get install npm
$ npm install express
```

### Installing grunt globally

```bash
$ npm install -g grunt-cli
```

### Installing Yoeman globally (optional)

```bash
$ npm install -g yo

$ npm list -g yo

$ which yo
```
- Install code generator

```bash
$ npm install -g generator-angular
```

```
$ npm install -g generator-angular-fullstack
```

- Creating angularJS code using Yoeman

```
$ yo
```

## Running Application

Go to project home directory

```
$ npm install
$ bower install
$ grunt serve OR
$ grunt serve:dist
```
###### Running app in background
```
$ nohup grunt serve:dist --force &
```

### Install forever
```
$ sudo npm install forever -g
$ forever start server/app.js
$ forever stop server/app.js
```
port = 28019
mongodb Config File: `/etc/mongodb.conf`
elastic http.port: 9292
Finding how many core a machine have: grep processor /proc/cpuinfo | wc -l

grunt build
vi dist/server/app.js
set env to production
Change Elasticsearch port
go to dist
forever start server/app.js
node server/app.js
### General mongodb command

```
mongo
show dbs;
use DB;
show collections;

db.users.find();

```
## Installing maven
sudo apt-get install maven
command apt-get install the Maven in /usr/share/maven.

## Installing Elasticsearch

```
$ apt-get install elasticsearch

http://localhost:9200/_plugin/bigdesk/#nodes
http://localhost:9200/_plugin/HQ/?#cluster
```





