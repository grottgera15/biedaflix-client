var path = require('path');

module.exports = {
    chainWebpack: config => {
            config.resolve.alias.set("@", path.resolve("src")),
            config.resolve.alias.set("@styles", path.resolve("src/styles")),
            config.resolve.alias.set("@classes", path.resolve("src/classes")),
            config.resolve.alias.set("@mixins", path.resolve("src/components/Mixins")),
            config.resolve.alias.set("@vuexMutations", path.resolve("src/vuex/mutations")),
            config.resolve.alias.set("@files", path.resolve("src/files"))
    }
};