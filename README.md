eventy
==========

An object event injection.


## Installation
npm
```bash
npm install eventy
```

component
```bash
component install shallker-wang/eventy
```

## Quick Start
```javascript
var eventy = require('eventy');

function onUpdate(value) {
  console.log(value);
}

var user = {}
eventy(user);
user.on('update', onUpdate);
user.trigger('update', 'dead');
user.off('update', onUpdate);
```


## Global Uses
```javascript
var Eventy = require('eventy');

var Events = new Eventy();

function me() {
  Events.on('hi', function(message) {
    console.log(message);
  })  
}

function you() {
  Events.trigger('hi', 'from you');
}

me();
you();
```

## API
### eventy
#### .on(String eventname, Function callback)
#### .off(String eventname, Function callback)
#### .trigger(String eventname, [Arguments args...])
#### .triggerSync(String eventname, [Arguments args...])

## Test
Browser side   
http://shallker-wang.github.io/eventy/test/index.html   
http://shallker-wang.github.io/eventy/test/pass-args.html   
http://shallker-wang.github.io/eventy/test/multi-callbacks.html   


---

Copyright (c) 2013 Shallker Wang - MIT License (enclosed)
