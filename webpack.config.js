module.exports = {
  entry: { main: "./src" },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    libraryTarget: "umd",
    library: "<lib name>",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
    ],
  },
  externals: {
    react: "react",
  },
};
