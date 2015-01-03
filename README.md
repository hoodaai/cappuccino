# cappuccino
Front end stack for PlacementLoop. Its contains REST APIs along with client application

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

### Few tutorials
http://swagger.io/

[Elasticsearch Security Issue](https://www.found.no/foundation/elasticsearch-security/#staying-safe-while-developing-with-elasticsearch)
[Firewall setting ufw](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)
[initial server setup](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)
[Adding swap space](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)
[Hosting app to EC2](http://www.integratedwebsystems.com/hosting-a-nodejs-express-application-on-amazon-web-services-ec2/)
[Deploy Node server](https://gun.io/blog/tutorial-deploy-node-js-server-with-example/)
[DEploy Node server](https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx)



### UX motivation

- Below are the links which could be good starting point for UX and UI development.

[MIT media lab-example project](http://locast.mit.edu/memorytraces/)
[UI Pattern](http://ui-patterns.com/ "UI Pattern")

[AngularJS Modal](http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/)

[UI Sidebar](http://michalostruszka.pl/about/)
[UI Sidebar Flip](http://paislee.io/a-conceptual-introduction-to-angularjs/)
[Yosemite search bar](http://codepen.io/designcouch/pen/pAshC)
[Flexible Search bar](http://codepen.io/menzer/pen/geAto)
[Sidebar color suggestion and search bar](http://tympanus.net/Tutorials/ExpandingSearchBar/)
[Metro Icons](http://metroui.org.ua/icons.html)
[Google Material Design-CSS](http://cloudcannon.com/deconstructions/2014/12/05/material-design-delightful-details.html)
[Google MAterial Design](http://www.google.com/design/spec/animation/delightful-details.html)



[Material Design Botstrap CSS](http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html)
[Another Material Design github- made using polymer project](http://ebidel.github.io/material-playground/)
[Polymer Project - very good- Material design for WEB](https://www.polymer-project.org/)
[Material Design Icons](https://github.com/google/material-design-icons/blob/master/README.md)
[Material design resource around the Web](http://designmodo.com/material-design-resources/)

[For Placement Loop Website](http://www.creative-tim.com/get-shit-done) (http://www.secretkey.it/)
[Website Theme Idea](http://pixelkit.com/free-ui-kits/city-break/index.html)

[Floating Button](http://codepen.io/wibblymat/pen/mnGsu)
[Bootstrap sidebar](http://ironsummitmedia.github.io/startbootstrap-simple-sidebar/#)
[Bootstrap sidebar both side](https://github.com/asyraf9/bootstrap-sidebar)
[UI Guide](http://pointnorth.io/)

Use spinner instead of slider
[CSS3 Toggle Switch - A UI Alternative to Checkboxes](http://andymcfee.com/2012/05/01/css3-toggle-switch-a-ui-alternative-to-checkboxes/)
[43 essential controls for web app](http://www.uxbooth.com/articles/essential-controls-for-web-applications/)

[Progress indicator Angularjs](http://victorbjelkholm.github.io/ngProgress/#demo) (http://chieffancypants.github.io/angular-loading-bar/#)
[Angular Spinner](https://github.com/urish/angular-spinner)

[Gephi](http://gephi.github.io/)

[d3js](http://d3js.org/)

[Better website design](http://www.smashingmagazine.com/2012/07/11/better-product-pages-turn-visitors-into-customers/)

[Iterative Prototyping](http://reecegeorge.com/iterative-prototyping.html)


