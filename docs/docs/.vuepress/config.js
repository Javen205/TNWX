module.exports = ctx => ( {
    base:'/TNWX/',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'TNWX',
            description: 'TNWX 微信系开发脚手架',
        },
    },
    markdown: {
        lineNumbers: true,
    },
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        repo: 'javen205/TNWX',
        editLinks: true,
        docsDir: 'docs/docs',
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: require('./nav/zh'),
                sidebar: {
                    '/guide/': getGuideSidebar('参考资料','新手指南','微信公众号','企业微信','微信支付','微信小程序','一杯咖啡'),
                },
            },
        },
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/pwa', {
            serviceWorker: true,
            // updatePopup: true,
            updatePopup: {
               message: "部分内容已更新请刷新",
               buttonText: "刷新"
            }
        }],
        ['@vuepress/medium-zoom', true],
        ['@vuepress/google-analytics', {
            ga: 'UA-146072085-2'
        }],
        ['container', {
            type: 'vue',
            before: '<pre class="vue-container"><code>',
            after: '</code></pre>',
        }],
        ['container', {
            type: 'upgrade',
            before: info => `<UpgradePath title="${info}">`,
            after: '</UpgradePath>',
        }],
    ],
    extraWatchFiles: [
        '.vuepress/nav/zh.js',
    ]
})

function getGuideSidebar (tools,groupA,groupB,groupC,groupD,groupE,groupF) {
    return [
        {
            title: tools,
            collapsable: false,
            children: [
                'tools/frp.md',
            ]
        },
        {
            title: groupA,
            collapsable: false,
            children: [
                'common/init',
                'common/accesstoken',
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'wxmp/callback',
                'wxmp/sendmsg',
                'wxmp/custom_menu',
                'wxmp/templatemsg',
                'wxmp/oauth',
                'wxmp/jssdk',
            ]
        },
        {
            title: groupC,
            collapsable: false,
            children: [
                'wxcp/callback',
                'wxcp/handmsg',
                'wxcp/sendmsg',
                'wxcp/media',
            ]
        },
        {
            title: groupD,
            collapsable: false,
            children: [
                'wxpay/',
                'wxpay/api-v2',
                'wxpay/api-v3',
            ]
        },
        {
            title: groupE,
            collapsable: false,
            children: [
                'miniprogram/login',
                'miniprogram/subscribemsg',
                'miniprogram/ocr',
                'miniprogram/qrcode',
            ]
        },
        {
            title: groupF,
            collapsable: false,
            children: [
                'donate/',
            ]
        }
    ]
}





