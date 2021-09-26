const fs = require('fs')



export default (content: any) => {
    
    fs.writeFile(`./${new Date().getTime()}-log.txt`, content, (err:Error) => {
      if (err) {
        console.error(err)
        return
      }
      //文件写入成功。
    })
}