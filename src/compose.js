function compose(...middlewares) {
    return middlewares.reduce((a, b) => (...args) => b(a(...args)))
}

export default compose