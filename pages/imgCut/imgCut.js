import {
    uploadImgToCos,
    deleteCosImg
} from "../../utils/uploadImg"
import {
    graphqlSetAvatar,
    ocrImg
} from "./service"
import { $Message  } from '../../components/Iview/base/index'
let cropper = null;
let from = '';
const defailtConfig = {
    debug: true, //可选。是否启用调试，默认值为false。true：打印过程日志；false：关闭过程日志
    outputFileType: 'jpg', //可选。目标文件的类型。默认值为jpg，jpg：输出jpg格式图片；png：输出png格式图片
    quality: 1, //可选。图片的质量。默认值为1，即最高质量。目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
    aspectRatio: 1.25, //可选。裁剪的宽高比，默认null，即不限制剪裁宽高比。aspectRatio需大于0
    minBoxWidthRatio: 0.2, //可选。最小剪裁尺寸与原图尺寸的比率，默认0.15，即宽度最小剪裁到原图的0.15宽。
    minBoxHeightRatio: 0.2, //可选。同minBoxWidthRatio，当设置aspectRatio时，minBoxHeight值设置无效。minBoxHeight值由minBoxWidth 和 aspectRatio自动计算得到。
    initialBoxWidthRatio: 0.6, //可选。剪裁框初始大小比率。默认值0.6，即剪裁框默认宽度为图片宽度的0.6倍。
    initialBoxHeightRatio: 0.6 //可选。同initialBoxWidthRatio，当设置aspectRatio时，initialBoxHeightRatio值设置无效。initialBoxHeightRatio值由initialBoxWidthRatio 和 aspectRatio自动计算得到。
}
Page({


    data: {

    },
    //////////////  init /////////////////////////
    onLoad: function (options) {
        var tempFilePaths = options.src;
        from = options.from
        cropper = this.selectComponent('#cropper');
        console.log("cropper", cropper);
        cropper.fnInit({
            imagePath: tempFilePaths, //*必填
            ...defailtConfig
        });
    },

    ////////  cancel ///////////////////
    fnRepeat: function () {
        cropper = this.selectComponent('#cropper');
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                const src = res.tempFilePaths[0]
                cropper.fnInit({
                    imagePath: src, //*必填
                    ...defailtConfig
                });
            }
        })
        //todo something
    },

    ////////// do crop ////////////////////
    fnSubmit: function () {
        console.log('submit')
        //do crop
        cropper.fnCrop({
            //剪裁成功的回调
            success: function (res) {
                const tempFilePath = res.tempFilePath
                if (from === 'profile') {
                    uploadImgToCos(tempFilePath, (res) => {
                        graphqlSetAvatar(res.Location);
                    });
                }
                if (from === 'createExam') {
                    let _ocrImg;
                    uploadImgToCos(tempFilePath, (res) => {
                        _ocrImg = 'https://' + res.Location
                        // 这里要注意一定要这进行ocr因为照片上传时异步的
                        ocrImg(_ocrImg).then((ocrString) => {
                            // ocr因为时一次性的成功后可以删除存储对象中的img
                            deleteCosImg(res.Location.split('/')[1])
                            const _ocrString = ocrString.data.items.reduce((pre, item) => pre + item.text, "")
                            // 获取路由栈，因为navigateBack不能携带参数，通过获取createExam对象完成数据操作
                            const pages = getCurrentPages()
                            const createExamPage = pages[pages.length - 2]
                            createExamPage.setData({
                                textArea: _ocrString
                            })
                            wx.navigateBack({
                                delta: 1
                            })
                            // wx.navigateTo({
                            //   url: `/pages/createExam/createExam?from=imgCut&ocrData=${_orcData}`,
                            // })
                        });
                    });

                }
                if (from === "createExam1" || from === "createNotify") {
                    const pages = getCurrentPages()
                    const createExamPage = pages[pages.length - 2]
                    createExamPage.setData({
                        imgList: [...createExamPage.data.imgList, tempFilePath]
                    })
                    wx.navigateBack({
                        delta: 1
                    })
                }
                return;
            },
            //剪裁失败的回调
            fail: function (res) {
                console.log(res);
            },

            //剪裁结束的回调
            complete: function () {
                //complete
            }
        });
    }
})