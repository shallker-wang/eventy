eventy
==========

An object event injection.


## Installation
```bash
npm install eventy
```


## Quick Start
```javascript
var eventy = require('eventy');

function onUpdate(value) {
  console.log(value);
}

var user = {}
user.on('update', onUpdate);
user.trigger('update', 'dead');
user.off('update', onUpdate);
```

---

Copyright (c) 2013 Shallker Wang - MIT License (enclosed)
