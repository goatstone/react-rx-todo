var log = function (x) {
    const devMode = true
    const a = Array.from(arguments)
    if (devMode) {
        console.log(...a)
    }
}

module.exports = log
