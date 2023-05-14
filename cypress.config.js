import { defineConfig } from 'cypress'

// eslint-disable-next-line unicorn/prefer-module
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
