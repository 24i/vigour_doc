'use strict'
module.exports = exports = function expectedCommentFactory (fnName, id) {
  return `#### var canMakeYouHappy = ${fnName}(text, amount, isCool, things)

***Oh*** man this *function* does **so** many [things](http://things.com)!!!
- **param** {*string*} text - Words, \`sentences\`, and more*
- **param** {*number*} amount
- **param** {*boolean*} isCool - always \`true\`
- **param** {*array*} things All sorts of things
- **returns** {*boolean*} canMakeYouHappy - usually \`true\``
}
