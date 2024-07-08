import { extname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
      },
    },
  },
})
