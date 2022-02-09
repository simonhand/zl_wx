// pages/avatarCut/avatarCut.js
const app = getApp()
//引入的组件
import WeCropper from '../../components/we-cropper/we-cropper.js'
const COS = require('../../utils/cos-wx-sdk-v5')
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 150
const token = wx.getStorageSync('token')

var cos = new COS({
    SecretId: '*',
    SecretKey: '*',
})
Page({
    data: {
        cropperOpt: {
            id: 'cropper',
            width,
            height,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (width - 200) / 2,
                y: (height - 200) / 2,
                width: 200,
                height: 200
            }
        },
        avatar: "",
        canvasImgUrl: '',
        imageSize: ''

    },
    touchStart(e) {
        this.wecropper.touchStart(e)
    },
    touchMove(e) {
        this.wecropper.touchMove(e)
    },
    touchEnd(e) {
        this.wecropper.touchEnd(e)
    },
    //这个是保存上传裁剪后的图片的方法
    getCropperImage() {
        var that = this
        this.wecropper.getCropperImage((avatar) => {
            if (avatar) {
                // that.getCanvasImg(0, 0, avatar);    //进行压缩
                // that.uploadImage(avatar, (res) => {
                //     console.log("上传结果", res);
                // })
                that.UploadImgToCos(avatar, (res) => {
                    console.log("res", res);
                });
            } else {
                console.log('获取图片失败，请稍后重试')
            }
        })
    },
    //重新选择头像
    uploadTap() {
        const self = this
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                const src = res.tempFilePaths[0]
                // 获取裁剪图片资源后，给data添加src属性及其值
                self.wecropper.pushOrign(src)
            }
        })
    },
    //压缩并获取图片，这里用了递归的方法来解决canvas的draw方法延时的问题
    getCanvasImg: function (index, failNum, tempFilePaths) {
        var that = this;
        console.log(111)
        wx.getImageInfo({
            src: tempFilePaths, //图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径,  
            success: res => {
                console.log(res)
                const ctx = wx.createCanvasContext('attendCanvasId');
                setTimeout(() => {
                    ctx.drawImage(tempFilePaths, 0, 0, 100, 100);
                    ctx.draw(true, function () {
                        wx.canvasToTempFilePath({
                            canvasId: 'attendCanvasId',
                            success: function success(res) {
                                console.log(res)
                                that.UploadImgToCos(res.tempFilePath, (res) => {
                                    console.log("zlzllzl", res);
                                });
                            },
                            fail: function (e) {
                                console.log("error", e);
                                failNum += 1; //失败数量，可以用来提示用户
                                that.getCanvasImg(inedx, failNum, tempFilePaths);
                            }
                        });
                    });
                }, 1000);
            },
            fail: () => {},
            complete: () => {}
        });
    },

    onLoad(option) {
        let that = this;
        const {
            cropperOpt
        } = this.data;
        var tempFilePaths = option.src;
        // that.setData({
        //   // tempFilePath可以作为img标签的src属性显示图片
        //   avatar: option.src,
        // })
        if (option.src) {
            cropperOpt.src = option.src
            new WeCropper(cropperOpt)
                .on('ready', (ctx) => {})
                .on('beforeImageLoad', (ctx) => {
                    // wx.showToast({
                    //   title: '上传中',
                    //   icon: 'loading',
                    //   duration: 2000
                    // })
                })
                .on('imageLoad', (ctx) => {
                    // wx.hideToast()
                })
                .on('beforeDraw', (ctx, instance) => {})
                .updateCanvas()
        }
    },

    UploadImgToCos(avatar, cb) {
        var filePath = avatar;
        var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
        cos.postObject({
            Bucket: 'luqiao-1305980897', // Bucket 格式：test-1250000000
            Region: 'ap-nanjing',
            Key: filename,
            FilePath: filePath,
            onProgress: function (info) {
                console.log("zhangle",JSON.stringify(info));
            }
        }, function (err, data) {
            console.log("success",err || data);
        });
    },
})