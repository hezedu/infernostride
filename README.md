# Sas.js
Sas 是一个可以递归的(同/异)步结合 的Function。
S代表sync/同步 AS代表async/异步。
可以用在[Node.js](http://nodejs.org) `npm install sas`,也可用用在前端。

## 例子Examples
nodejs全部用异步方法`mkdir`创建目录树.先创建一个根目录,再在根目录下创建三子目录,再在三子目录下各创建三子目录.
```javascript
var sas = require('../sas');
var fs = require('fs');

var mktree = function(path) {
  return function(cb, ext) {
    if (ext.Sparent) {
      path = ext.Sparent[0] + path;
    }
    fs.mkdir(path, 777, function(err, result) {
      if (err) {
        return cb('$STOP');
      }
      cb(path);
    });
  }
}
var plan = [
  mktree(__dirname + '/root' + Date.now()), {
    '1': [mktree('/1'), {
      '1-1': mktree('/1-1'),
      '1-2': mktree('/1-2'),
      '1-3': mktree('/1-3')
    }],
    '2': [mktree('/2'), {
      '1-1': mktree('/2-1'),
      '1-2': mktree('/2-2'),
      '1-3': mktree('/2-3')
    }],
    '3': [mktree('/3'), {
      '1-1': mktree('/3-1'),
      '1-2': mktree('/3-2'),
      '1-3': mktree('/3-3')
    }]
  }
];
sas(plan);
```
## 详细说明

### sas(arr,opt)
第一个参数 `arr` 是一个数组,包含三种元素:

- 数组Array:代表同步sync(因为有序)
- 对象Object:代表异步async(因为有key,顺序乱了也没事)
- 函数Function:处理回调callback
- 若为其它类型而`opt`iterator不为true的话，会抛出一个错误。

第二个参数 `opt` 是一个对象,可选：

- `debug:bool` 强大的追踪不管是异步还是同步都能追踪到，开启后会在console显示log，默认为false。
前面的例子:
`sas(plan)`