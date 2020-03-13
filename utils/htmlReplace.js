var fs = require('fs')
const glob = require('glob')
/**
 * html文件替换
 * @param src
 * @param dst
 */
var callbackFile = function (src, dst, name, filepath) {
  fs.readFile(src, 'utf8', function (error, data) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
    let regCss = new RegExp('/dist/css/' + name + '', 'g')
    let regJs = new RegExp('/dist/js/' + name + '', 'g')
    let htmlContent = data.toString().replace(regCss, `./css/${name}`).replace(regJs, `./js/${name}`)
    console.log('src', src)
    console.log('name', name)
    console.log('filepath', filepath)
    // <link href=/dist./css/index.930ae250.css rel=preload as=style>
    // <link href=/dist/js/chunk-vendors.33d4e0f8.js rel=preload as=script>
    // <link href=/dist./js/index.633dec73.js rel=preload as=script>
    // <link href=/dist./css/index.930ae250.css rel=stylesheet>
    fs.writeFile(dst, htmlContent, 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
      console.log('html重新写入成功')
      if (src.indexOf('/index.html') === -1) {
        fs.unlink(src, function () {
          //  console.log('html删除成功')
        })
      }
      fs.unlink(filepath, function () { // css删除成功
      })
      fs.unlink(filepath + '.map', function () { // css删除成功
      })
    })
  })
}
// 复制目录
glob.sync('./dist/js/*.js').forEach((filepath, name) => {
  let fileNameList = filepath.split('.')
  let fileName = fileNameList[1].split('/')[3]// 多页面页面目录
  let thisDirectory = `./dist/${fileName}/${fileName}.html`// 多页面JS文件地存放址
  let changeDirectory = `./dist/${fileName}/index.html`// 多页面JS文件地存放址
  if (!fileName.includes('chunk-vendors')) {
    callbackFile(thisDirectory, changeDirectory, fileName, filepath)
  }
})
