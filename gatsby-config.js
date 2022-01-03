const { useGatsbyConfig } = require("gatsby-plugin-ts-config")

module.exports = useGatsbyConfig(() => require("./src/config/gatsby-config"))
