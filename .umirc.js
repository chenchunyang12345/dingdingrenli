
// ref: https://umijs.org/config/
export default {
  publicPath: './',
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../pages/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/chat', component: '../pages/chat/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'dingding',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
