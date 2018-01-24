module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Mayflower',
      externals: {
        react: 'React'
      }
    }
  },
  babel: {
    stage: 1
  }
}
