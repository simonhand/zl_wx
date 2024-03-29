import {
  cos
} from '../config/secret'
export const uploadImg = (obj, url,custom = false,callback) => {
  let that = obj
  wx.showActionSheet({
    itemList: ['从相册中选择', '拍照'],
    success: function (res) {
      if (!res.cancel) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          if(custom){
            callback('album')
          }else{
            chooseWxImage(that, 'album', url)
          }
        } else if (res.tapIndex == 1) {
          if (custom) {
            callback("camera")
          }else{
            chooseWxImage(that, 'camera', url)
          }
        }
      }
    }
  })
}

const chooseWxImage = function (obj, type, url) {
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function (res) {
      var tempFilePaths = res.tempFilePaths;
      wx.navigateTo({
        url: url + tempFilePaths
      });
    }
  })
}


export const uploadImgToCos = (avatar, cb) => {
  var filePath = avatar;
  var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
  // console.log("filename", filename);
  cos.postObject({
    Bucket: 'luqiao-1305980897', // Bucket 格式：test-1250000000
    Region: 'ap-nanjing',
    Key: filename,
    FilePath: filePath,
    onProgress: function (info) {
      // console.log("zhangle", JSON.stringify(info));
    }
  }, function (err, data) {
    cb(data);
    // console.log("success", err || data);
  });
}

export const deleteCosImg = (key) => {
  cos.deleteObject({
    Bucket: 'luqiao-1305980897', // Bucket 格式：test-1250000000
    Region: 'ap-nanjing',
    Key: key,
  }, function (err, data) {
    console.log(err || data);
  });
}