# project-one

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 线上地址
地址：[https://admin.meiguo.life]

### 发布的node版本
v10
### 运行node版本
v16.14.0
### 导出表格的时候对npm包做了修改进行实现兼容  部分commons是img类型但是是text空的情况
```js
//对导出文件修改之后的代码
const temp = column.reduce((tds, col) => {
			if (row[col.key]) {
				tds += typeMap[col.type || 'text'](row[col.key], col)
			} else {
				if (col.type == 'image' || col.key == 'link') {
					row[col.key] = ''
				}
				tds += typeMap['text'](row[col.key], col)
			}
			return tds
		}, '')
```

### 部署修改(不修改的话发布只能在node10下进行)

为了兼容gulpfile.js文件下的gulp-scp2模块只能在node10环境运行  
修改配置文件 
路径地址：node_modules\scp2\node_modules\graceful-fs\fs.js
```js
module.exports = require('natives').require('fs', ['stream'])
//修改为
module.exports = require('fs', ['stream'])
```

