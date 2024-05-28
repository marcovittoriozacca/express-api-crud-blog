const fs = require('fs');
const path = require('path');


const showLink = (req, element) => {
    const elementPath = element.replaceAll(' ', '-').replaceAll('/', '-').toLowerCase();
    return `http://${req.headers.host}/posts/${elementPath}`;
}
const getTemplate = (name) => {
    const filePath = path.join(__dirname, name+'.html');
    return fs.readFileSync(filePath).toString();
}

const generateSlug = (name) => {
    let slug = name.trim().replaceAll(" ", "-").replaceAll("/", "-").toLowerCase();
    return slug;
}

const checkElementInArray = (array, element, elementToCheck) => {
    const filteredArray = array.filter(e => e[element] === elementToCheck);

    if(filteredArray.length > 0){
        return {
            check: true,
            element: filteredArray,
            count: filteredArray.length
        }
    }else{
        return {
            check: false,
        }
    }
}


module.exports = {
    showLink,
    getTemplate,
    generateSlug,
    checkElementInArray
}