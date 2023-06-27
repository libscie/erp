// @ts-check
const { withBlitz } = require("@blitzjs/next")
const path = require("path")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/

module.exports = withBlitz({
  sassOptions: {
    includePaths: ["node_modules", path.join(__dirname, "styles")],
  },
})
