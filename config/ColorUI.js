//框架核心配置
import ColorUI from '../components/mp-cu/main'
export const colorUI = new ColorUI({
    config: {
        theme: 'auto',
        main: 'blue',
        text: 1,
        footer: true,
        share: true,
        shareTitle: 'MP CU（ ColorUI3.x 原生小程序版）',
        homePath: '/pages/index/index',
        tabBar: [
            {
                url: "pages/index/index",
                icon: "/static/tab_icon/custom.png",
                curIcon: "/static/tab_icon/custom_cur.png",
                title: "首页"
            },
            {
                url: "pages/logs/logs",
                icon: "/static/tab_icon/tpl.png",
                curIcon: "/static/tab_icon/tpl_cur.png",
                title: "记录"
            },
            {
                url: "pages/profile/profile",
                icon: "/static/tab_icon/my.png",
                curIcon: "/static/tab_icon/my_cur.png",
                title: "我的"
            }
        ],
        // tabBar11: [{
        //         title: '文档',
        //         icon: '/static/tab_icon/document.png',
        //         curIcon: '/static/tab_icon/document_cur.png',
        //         url: '/pages/home/home',
        //         type: 'tab'
        //     },
        //     {
        //         title: '模板',
        //         icon: '/static/tab_icon/tpl.png',
        //         curIcon: '/static/tab_icon/tpl_cur.png',
        //         url: '/pages/template/home',
        //         type: 'tab'
        //     },
        //     {
        //         title: '定制',
        //         icon: '/static/tab_icon/custom.png',
        //         curIcon: '/static/tab_icon/custom_cur.png',
        //         url: '/pages/custom/home',
        //         type: 'tab'
        //     },
        //     {
        //         title: '实验',
        //         icon: '/static/tab_icon/test.png',
        //         curIcon: '/static/tab_icon/test_cur.png',
        //         url: '/pages/test/home',
        //         type: 'tab'
        //     },
        //     {
        //         title: '我的',
        //         icon: '/static/tab_icon/my.png',
        //         curIcon: '/static/tab_icon/my_cur.png',
        //         url: '/pages/my/home',
        //         type: 'tab'
        //     }
        // ],
    }
})