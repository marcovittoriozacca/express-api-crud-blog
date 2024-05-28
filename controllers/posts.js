const postsList = require('../database/db.js');
const path = require('path');
const fs = require('fs');
const {showLink, getTemplate, generateSlug} = require('../utils.js');
//index controller for the route /posts

let html = getTemplate('template');

const index = (req,res) => {
    const getView = require('../views/posts/index.js');
    const { content } = getView(req, postsList, showLink);
    const mainHtml = html.replace("yield", content);
    res.send(mainHtml);
}
//show controller for the route /posts/:slug where :slug is a dynamic parameter passed throug the url
const show = (req, res) => {
    const param =  req.params.slug;
    
    let targetPost = postsList.find(post => post.slug === param);
    res.format({
        html: () => {
            if(targetPost){
                const getView = require('../views/posts/show.js');
                const { content } = getView(targetPost);
                const mainHtml = html.replace('yield', content);
                res.send(mainHtml);
            }else{
                res.status(404).send(`Post: ${param} not found`);
            }
        },
        json: () => {
            if(targetPost){
                targetPost.image_url = `${req.headers.host}/imgs/posts/${targetPost.image}`;
                targetPost.image_download_link = `${req.headers.host}/posts/${param}/download`;
                res.json(targetPost);
            }else{
                res.status(404).json({
                    success: false,
                    error: `Post: ${param} not found`
                });
            }
        }
    })
}

//create controller - at the moment its just displays an h1
const create = (req, res) => {

    const {title, content, image, tags} = req.body;
    if(!title || !content || !image || !tags){
        res.format({
            json: () => res.status(400).send({
                            success: false,
                            error: "One or more information are missing"
                        }),
            html: () => {res.status(400).send("<h1>One or more information are missing</h1>")}
        })
    }else{
        const slug = generateSlug(title);
        const newPost = {
            title,
            slug,
            content,
            image,
            tags,
        };

        res.format({
            json: () => {            
                res.send({
                    success: true,
                    statusCode: 200,
                    newPost
                });
            },
            html: () => {
                res.redirect('/posts');
            },
            default: () => {
                res.status(406).send('Error 406 - Not Acceptable')
            }
        })
    }
}

//download route to download the single post image
const download = (req, res) => {
    const param = req.params.slug;
    const targetPost = postsList.find(post => post.slug.replace('/', '-') === param);
    if(targetPost){
        const imagePath = path.join(__dirname, '../public/imgs/posts/', `${targetPost.image}`);
    
        if(fs.existsSync(imagePath)){
            res.download(imagePath)
        }else{
            res.status(404).send(`Error 404 - The image ${targetPost.image} doesn't exist`)
        }
    }else{
        res.status(404).send(`Error 404 - Post: ${param} doesn't exist`)
    }

}

const destroy = (req, res) => {
    res.format({
        html: () => res.redirect("/posts"),
        default: () => res.send("Post eliminato")
    })
};
module.exports = {
    index,
    show,
    create,
    download,
    destroy,
}
