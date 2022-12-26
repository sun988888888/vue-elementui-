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

