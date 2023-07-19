const express = require ('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const fm=require('front-matter');
const FormData = require('form-data');
const fs = require('fs');
const port = 6000;
const {Medium_Token, Hashnode_Token} = require('./config/config.js');

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
    return res.data.data.user.publication.posts[0]
    }
    catch(err){
        console.log(err)
    }
}


getBlog("json-web-token-jwt-explained").then((res)=>{
    console.log(res)
}
)








app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
