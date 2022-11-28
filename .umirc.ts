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
      component: '@/pages/BatchTasks/index',
      title: 'BF',
    },
  ],
  title: 'Python_QRCode',
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
});
