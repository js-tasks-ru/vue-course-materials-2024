import { extname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { URL } from 'node:url'

function devServerMultiPageSpa() {
  return {
    name: 'dev-server-multi-page-spa',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rollupOptionsInput = server.config.build.rollupOptions.input
        if (!rollupOptionsInput) {
          return next()
        }

        const pathname = new URL(req.url, 'http://localhost').pathname
        const isFile = !!extname(pathname)
        if (isFile) {
          return next()
        }

        const page = Object.keys(rollupOptionsInput).find(page => pathname.startsWith(`/${page}`))
        if (page) {
          req.url = `/${page}/index.html`
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    vue({
      script: {
        // Будет включено по умолчанию с Vue 3.5
        propsDestructure: true,
      }
    }),
    vueJsx(),
    devServerMultiPageSpa(),
  ],

  build: {
    rollupOptions: {
      input: {
        '01-basics': resolve(__dirname, '01-basics/index.html'),
        '02-basics-2': resolve(__dirname, '02-basics-2/index.html'),
        '03-components': resolve(__dirname, '03-components/index.html'),
        '04-sfc': resolve(__dirname, '04-sfc/index.html'),
        '05-ts': resolve(__dirname, '05-ts/index.html'),
        // 06-vite - Требует отдельный запуск из директории ./06-vite/
        '07-spa': resolve(__dirname, '07-spa/index.html'),
        '08-vue-router': resolve(__dirname, '08-vue-router/index.html'),
        '09-one-way-dataflow--01-prop-mutation': resolve(__dirname, '09-one-way-dataflow/01-prop-mutation/index.html'),
        '09-one-way-dataflow--02-emit-on-update': resolve(__dirname, '09-one-way-dataflow/02-emit-on-update/index.html'),
        '09-one-way-dataflow--03-local-submit': resolve(__dirname, '09-one-way-dataflow/03-local-submit/index.html'),
        '09-one-way-dataflow--04-one-way-sync': resolve(__dirname, '09-one-way-dataflow/04-one-way-sync/index.html'),
        '09-one-way-dataflow--05-two-way-sync': resolve(__dirname, '09-one-way-dataflow/05-two-way-sync/index.html'),
        '09-one-way-dataflow--06-setters': resolve(__dirname, '09-one-way-dataflow/06-setters/index.html'),
        '10-composables': resolve(__dirname, '10-composables/index.html'),
        '11-shared-state-and-pinia': resolve(__dirname, '11-shared-state-and-pinia/index.html'),
        '12-wrappers': resolve(__dirname, '12-wrappers/index.html'),
        '13-reactivity': resolve(__dirname, '13-reactivity/index.html'),
        '14-rendering--01-key': resolve(__dirname, '14-rendering/01-key/index.html'),
        '14-rendering--02-render-function': resolve(__dirname, '14-rendering/02-render-function/index.html'),
        '14-rendering--03-jsx': resolve(__dirname, '14-rendering/03-jsx/index.html'),
        '15-rendering-2--01-scoped-slots': resolve(__dirname, '15-rendering-2/01-scoped-slots/index.html'),
        '15-rendering-2--02-optimizations': resolve(__dirname, '15-rendering-2/02-optimizations/index.html'),
        '16-provide-inject': resolve(__dirname, '16-provide-inject/index.html'),
        '17-container-content': resolve(__dirname, '17-container-content/index.html'),
        '18-directives': resolve(__dirname, '18-directives/index.html'),
        '19-plugins': resolve(__dirname, '19-plugins/index.html'),
      },
    },
  },

  test: {
    environment: ['happy-dom'],

    server: {
      deps: {
        // Allow import .css
        inline: ['@shgk/vue-course-ui'],
      },
    },
  },
})
