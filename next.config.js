// @ts-check
const { withBlitz } = require("@blitzjs/next")
const path = require("path")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/

module.exports = withBlitz({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
})
