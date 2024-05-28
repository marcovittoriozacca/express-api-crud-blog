const {checkElementInArray} = require('../utils.js');
const postsList = require('../database/db.json');

const deletePostCheck = (req, res, next) => {
    const slug = req.params.slug;

    const postToDelete = checkElementInArray(postsList,"slug",slug);

    if(postToDelete.check){
        return next();
    }
    return res.status(404).send('Element not found');

}

module.exports = {
    deletePostCheck,
}