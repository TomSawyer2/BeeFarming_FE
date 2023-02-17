import { defineConfig } from 'umi';
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

export default defineConfig({
  hash: true,
  webpack5: {},
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/home/index', title: 'BF' },
    {
      path: '/batchTasks',
      component: '@/pages/batchTasks/index',
      title: '批处理任务',
    },
    { path: '/register', component: '@/pages/register/index', title: '注册' },
    { path: '/login', component: '@/pages/login/index', title: '登录' },
    { path: '/history', component: '@/pages/history/index', title: '历史记录' },
  ],
  title: 'BeeFarming Web',
  fastRefresh: {},
  mfsu: {},
  dynamicImport: {},
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed',
  },
  chainWebpack: (config: any) => {
    config.plugin("monaco-editor").use(new MonacoWebpackPlugin(), [
      {
        languages: ["java"],
      },
    ]);
  },
  antd: {
    dark: true,
  },
});
