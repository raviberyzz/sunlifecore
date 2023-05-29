
/* Util class for module and clientlib manager */
class Util {
    constructor(params) {
        this.module = params.module;
    }

    logger(msg) {
        console.log(`${this.module}: ${msg}`);
    }
}

module.exports = Util;