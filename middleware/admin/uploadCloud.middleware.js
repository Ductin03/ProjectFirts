const cloudinary=require("cloudinary").v2;
const streamifier=require("streamifier");
cloudinary.config({ 
    cloud_name: process.env.name_cloud, 
    api_key: process.env.key_api, 
    api_secret: process.env.secret_api
  });
  module.exports.uploadCloud=(req, res, next)=> {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) { //định nghĩa hàm upload
            let result = await streamUpload(req);
            console.log(result);
            req.body[req.file.fieldname]=result.secure_url;
            next();
        }      
        upload(req);
        }else{   
            next();
        }

}