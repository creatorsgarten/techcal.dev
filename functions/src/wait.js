// @ts-check

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
exports.wait = ms => new Promise(r => setTimeout(r, ms))
