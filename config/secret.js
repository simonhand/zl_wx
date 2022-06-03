const COS = require('../utils/cos-wx-sdk-v5')

export const cos = new COS({
    SecretId: 'AKIDd5HDsGNDm58uOdcKbdOs52kBLErCG4bs',
    SecretKey: '2nHVS8WfYBbmiMkriJdhV2II1UgbFdka',
})

export const calcType = [{
    title: '基础',
    sub: [{
            icon: 'cicon-level_11',
            // name: 'navbar',
            fontSize: 30,
            title: '5以内的加法'
        },
        {
            icon: 'cicon-level_12',
            fontSize: 30,
            title: '5以内的减法'
        },
        {
            icon: 'cicon-level_13',
            fontSize: 30,
            title: '6-10的加法'
        },
        {
            icon: 'cicon-level_14',
            fontSize: 30,
            title: '6-10的减法'
        },
        {
            icon: 'cicon-level_15',
            fontSize: 30,
            title: '10以内的连加'
        },
        {
            icon: 'cicon-level_16',
            fontSize: 30,
            title: '10以内的连减'
        },
        {
            icon: 'cicon-level_1_1',
            fontSize: 30,
            title: '综合训练'
        }
    ]
},
{
    title: '进阶',
    sub: [{
            icon: 'cicon-level_21',
            fontSize: 30,
            title: '两位数的加法'
        },
        {
            icon: 'cicon-level_22',
            fontSize: 30,
            title: '两位数的减法'
        },
        {
            icon: 'cicon-level_23',
            fontSize: 30,
            title: '9以内的乘法'
        },
        {
            icon: 'cicon-level_24',
            fontSize: 30,
            title: '9以内的除法'
        },
        {
            icon: 'cicon-level_25',
            fontSize: 30,
            title: '乘法加法混合'
        },
        {
            icon: 'cicon-level_26',
            fontSize: 30,
            title: '乘法减法混合'
        },
        {
            icon: 'cicon-level_27',
            fontSize: 30,
            title: '除法加法混合'
        },
        {
            icon: 'cicon-level_28',
            fontSize: 30,
            title: '除法减法混合'
        },
        {
            icon: 'cicon-level_2_1',
            fontSize: 30,
            title: '综合练习'
        }
    ]
},
{
    title: '高级',
    sub: [{
            icon: 'cicon-level_31',
            fontSize: 30,
            title: '两位数除一位数'
        },
        {
            icon: 'cicon-level_32',
            fontSize: 30,
            title: '三位数除一位数'
        },
        {
            icon: 'cicon-level_33',
            fontSize: 30,
            title: '四位数除一位数'
        },
        {
            icon: 'cicon-level_34',
            fontSize: 30,
            title: '两位数乘两位数'
        },
        {
            icon: 'cicon-level_35',
            fontSize: 30,
            title: '三位数减法'
        },
        {
            icon: 'cicon-level_36',
            fontSize: 30,
            title: '三位数加法'
        },
        {
            icon: 'cicon-level_3_1',
            fontSize: 30,
            title: '综合练习'
        }
    ]
},
]