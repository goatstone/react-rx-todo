var log = function (x) {
    const devMode = false
    const a = Array.from(arguments)
    if (devMode) {
        console.log(...a)
    }
}

module.exports = log
