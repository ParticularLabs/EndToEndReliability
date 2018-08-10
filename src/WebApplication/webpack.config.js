var path = require("path");
module.exports = {	
    entry: [
        "babel-polyfill",
        "./Scripts/main"
    ],
    output: {
        publicPath: "/js/",
        path: path.join(__dirname, "/wwwroot/js/"),
        filename: "main.build.js"
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ["es2015", "stage-1"]
            }
        }]
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
};