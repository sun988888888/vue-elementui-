import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import html2canvas from "html2canvas";
import JSZip from 'jszip'
import table2excel from 'js-table2excel'
/**
 * 导出表格
 * @param {*} _this 对应组件的this
 * @param {*} api 接口链接。例如service.exportRedInfo
 * @param {*} data 请求参数。例如{product_id:id}
 */
export function exportExcelFn(_this, api, data) {
  _this.service({
    method: "POST",
    data: {
      api,
      data,
    },
    responseType: "blob",
  }).then(res => {
    _this.$message.success('正在导出，请稍后。')
    //let Base64 = require("js-base64").Base64;
    let blob = new Blob([res.data], {
      type: "application/force-download",
    });
    /*FileReader对象允许Web应用程序异步读取存储在用户计算机上的文件的内容*/
    let fileReader = new FileReader();
    /*开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data:URL格式的Base64字符串以表示所读取文件的内容 */
    fileReader.readAsDataURL(blob);
    fileReader.onload = (e) => {
      let a = document.createElement("a");
      /* let name = Base64.decode(res.headers["filename"]); */
      let name = window.atob(res.headers["filename"]);
      a.download = name;
      a.href = e.target.result;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  })
    .catch(error => {
      _this.$message.error(error);
    });
}

/**
 * 导出elementui的表格
 * @param {*} label 获取对应el-table元素 例子document.querySelector("#tableList")
 * @param {*} name  下载文档的名字
 */
export function uploadTaber(label, name) {
  let wb = XLSX.utils.table_to_book(label, { raw: true })
  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }), name
    )
  } catch (error) {
    console.error(error)
  }
}
/**
 * 导出elementui的表格
 * @param {*} label 获取对应模板的id 例子document.querySelector("#tableList")
 */
export function addCanvas(label) {
  html2canvas(label, {
    backgroundColor: "transparent",
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    // canvas为转换后的Canvas对象
    let oImg = new Image();
    oImg.src = canvas.toDataURL(); // 导出图片
    console.log(canvas.toDataURL());
    return canvas.toDataURL()
    //document.body.appendChild(oImg); // 将生成的图片添加到body
  });
}


/* 前端生成打包文件 */
/* 生成压缩文件 */
export function filesToRar(arrImages, filename,_this) {
  let zip = new JSZip();
  let cache = {};
  let promises = [];
  /* let times = 1;
  var setIme = setInterval(() => {
    times++;
    console.log(times);
  }, 1000);
 */
  for (let item of arrImages) {
    const promise = getImgArrayBuffer(item.fileUrl).then(data => {
      // 下载文件, 并存成ArrayBuffer对象(blob)
      zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
      cache[item.renameFileName] = data;
    });
    promises.push(promise);
  }
  Promise.all(promises)
    .then(() => {
      zip.generateAsync({ type: "blob" }).then(content => {
        // 生成二进制流
        FileSaver.saveAs(content, filename); // 利用file-saver保存文件  自定义文件名
        _this.$notify.close();
        _this.$notify({
          message: "压缩完成"
        });
        /* window.clearInterval(setIme); */
      });
    })
    .catch(() => {
      _this.$notify({
        message: "文件压缩失败"
      });
    });
}
//获取文件blob
function getImgArrayBuffer(url) {
  return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.responseType = "blob";
    xmlhttp.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.status);
      }
    };
    xmlhttp.send();
  });
}

/* 前端打印elementui表格 */
/**
 * 导出elementui的表格
 * @param {*} column 对应的表头
 * @param {*} tableData 传入对应的数据
 */
export function uploadElExcel(column,tableData){
 /*例子 
  const column = [{
    title: '手机号', //表格名称
    key: 'shouji',  //对应的key
    type: 'text'  //类型
  },
    {
      title: '照片',
      key: 'fileUrl',
      type: 'image',
      width: 200,
      height: 200
    },{
      title: '照片2',
      key: 'fileUrl2',
      type: 'image',
      width: 200,
      height: 200
    },{
      title: '照片3',
      key: 'fileUrl3',
      type: 'image',
      width: 200,
      height: 200
    },
  ] */
  let tableDatas = JSON.parse(JSON.stringify(tableData))
  let datas = tableDatas;
  table2excel(column, datas, '数据.xls')
}