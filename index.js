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


getBlog().then((data)=>{
    console.log(data)
})









app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
