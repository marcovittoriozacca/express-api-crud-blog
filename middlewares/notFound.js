const {getTemplate} = require('../utils.js');

module.exports = (req, res, next) => {
    let html = getTemplate('template');

    const getView = require('../views/posts/pageNotFound.js');
    const { content } = getView(req);
    const mainHtml = html.replace('yield', content);
    res.status(404).send(mainHtml);


}