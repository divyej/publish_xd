const express = require ('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const fm=require('front-matter');
const FormData = require('form-data');
const fs = require('fs');
const port = 8000;
const {Medium_Token, Hashnode_Token} = require('./config/config.js');
const { title } = require('process');
const { get } = require('http');

app.use(bodyParser.json());
//////////////////////auth to medium and hashnode/////////////////////////
const medium=Medium_Token
const mediumHeader=`Bearer ${medium}`
const hashnode=Hashnode_Token
/////////////////////////hashnode connection//////////////////////////////
const getBlog=async()=>{
    try{
    const res= await axios.post('https://api.hashnode.com', {
        query: 
        `query {
            user(username: "divyej")
             {
                publication 
                {
                posts(page: 0) 
                {
                    title 
                    brief 
                    slug 
                    coverImage
                    contentMarkdown
                    dateAdded
                    }
                }
            }
        }`,
    
    },
    {
        headers: {
          Authorization: hashnode,
        },
      }
    );
    data=res.data.data.user.publication.posts[0]
    console.log(data.title)
    console.log(data.slug)
    return data
    
    }
    catch(err){
        console.log(err)
    }
}



/////////////////////////medium connection//////////////////////////////

const postBlog=async()=>{
    try{
        const hashnodeData=await getBlog()
        console.log(hashnodeData)
        const {title, brief, slug, coverImage,  dateAdded}=hashnodeData
        const {contentMarkdown}=(hashnodeData)
        const preparedContent={
            title:title,
            contentFormat:"markdown",
            content:contentMarkdown,
            publishStatus:"draft",
            slug:slug,
            coverImage:coverImage,
            brief:brief,
        }
        console.log(preparedContent)
        return preparedContent
        
    }
    catch(err){
        console.log(err)
    }
}

postBlog()

const publishToMedium=async(content)=>{
    try{
        const mediumUrl='https://api.medium.com/v1/users/@divj32459/posts'
        const formData = new FormData();
        formData.append('title', content.title);
        formData.append('contentFormat', 'markdown');
        formData.append('content', content.content);
        formData.append('tags', content.tags);
        formData.append('publishStatus', 'draft');
       

        const res=await axios.post(mediumUrl, formData, {
            headers: {
                Authorization: mediumHeader,
                ...formData.getHeaders(),
            },
        });
        return res.data.data;
    }
    catch(err){
        console.log(err)
    }
}

app.get('/publish', async(req, res)=>{
    try{
        const content=await postBlog()
        const mediumData=await publishToMedium(content)
        res.status(200).json({message:"content prepared and published to medium"})
        console.log(mediumData)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}
)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
