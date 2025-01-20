const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    // Liste des dépendances à transpiler
    'my-dep',
    /other-dep/,
  ],

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              // parallel: false, // Décommentez si vous souhaitez désactiver le traitement parallèle
            },
          },
        },
      ],
    },
  },
})
