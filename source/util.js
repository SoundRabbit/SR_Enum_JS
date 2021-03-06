const maybeFunction = f => {
    if (typeof f == "function") {
        return f;
    } else {
        return (...args) => f;
    }
};

const always = v => _ => v;

const lazy = v => v;

module.exports = {
    maybeFunction,
    always,
    lazy
};
