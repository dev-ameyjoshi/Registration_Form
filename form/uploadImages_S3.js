// Include Statement for AWS
const AWS = require('aws-sdk');
const dotenv = require("dotenv");

dotenv.config({path : "./form/.env"});
//Configuration of SDK with credentials
AWS.config.update({
        accessKeyId:process.env.API_KEY,
        secretAccessKey:process.env.API_SECRET,
});

// creating a new instance of s3 service 
const s3 = new AWS.S3({params : {Bucket:'my-formdata'}})

module.exports = aws_upload =(params) =>{

        return new Promise((resolve,reject) => {

                const {filename,file} = params;

                const buf = Buffer.from(file.replace(/^data:.+;base64,/,""),"base64");

                const currentTime = new Date().getTime();

                const data = {
                        Key:`${currentTime}_${filename}`,
                        Body:buf,
                        ContentEncoding:'base64',
                        ACL:'public-read'
                }
                s3.putObject(data,(err,data) => {
                        if(err){
                                console.log(`Error Uploading file : ${err}`);
                                reject(err);
                        }else{
                                const url = `https://signup.s3.amazonaws.com/${currentTime}_${filename}`
                                resolve({ url })
                                console.log(`File Uploaded Succesfully. File URL ${url}`);
                        }
                });
        })
        
};

