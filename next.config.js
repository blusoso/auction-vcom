const path = require("path");

module.exports = {
    webpack: (config, { dev }) => {
        config.resolve.alias["@"] = path.resolve(__dirname);

        if (dev) {
            config.devtool = "cheap-module-source-map";
            config.output.crossOriginLoading = "anonymous";
        } else {
            config.devtool = "none";
        }

        config.node = {
            fs: "empty",
        };

        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 100000,
                    name: "[name].[ext]",
                },
            },
        });

        return config;
    },
};
