const {baseUrl} = require('../config/network')
const zlrequest = (data,method) => {
    const zlpromise = new Promise( (resolve,reject) => {
        wx.request({
          url: baseUrl,
          method:method,
          header:{
            "Content-Type": "application/json"
          },
          data,
          success(res){
              resolve(res)
          },
          fail(res){
              reject(res)
          }
        })
    })
    return zlpromise;
}

module.exports = {
    zlrequest,
}