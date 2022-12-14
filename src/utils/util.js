import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
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
export function uploadTaber(label,name){
  let wb = XLSX.utils.table_to_book(label,{raw:true})
  let wbout=XLSX.write(wb,{
    bookType:'xlsx',
    bookSST:true,
    type:'array'
  })
  try {
    FileSaver.saveAs(
      new Blob([wbout],{type:'application/octet-stream'}),name
    )
  } catch (error) {
    console.error(error)
  }
}