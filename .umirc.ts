import { defineConfig } from 'umi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';

export default defineConfig({
  hash: true,
  webpack5: {},
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/register', component: '@/pages/register/index', title: 'BF - 注册' },
    { path: '/login', component: '@/pages/login/index', title: 'BF - 登录' },
    {
      path: '/batchTasks',
      component: '@/pages/batchTasks/index',
      title: 'BF - 批处理任务',
    },
    { path: '/history', component: '@/pages/history/index', title: 'BF - 历史记录' },
    { path: '/admin', component: '@/pages/admin/index', title: 'BF - 管理员' },
    { path: '/ui', component: '@/pages/ui/index', title: 'BF - UI' },
  ],
  title: 'BeeFarming Web',
  fastRefresh: {},
  // mfsu: {},
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
  copy: ['/src/pwa/manifest.webmanifest'],
  links: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
  chainWebpack: (config: any) => {
    config.plugin('monaco-editor').use(new MonacoWebpackPlugin(), [
      {
        languages: ['java'],
      },
    ]);
    config.plugin('workbox').use(InjectManifest, [
      {
        swSrc: './src/pwa/service-worker.ts',
        swDest: 'service-worker.js',
        exclude: [/\.map$/, /favicon\.ico$/, /^manifest.*\.js?$/],
      },
    ]);
  },
});
