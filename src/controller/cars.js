import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

class CarController {
    constructor(){
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    }

    async saveOne(req, res, next) {
        console.log(req.files);
        let images = req.files;

        let multiple_uploads = new Promise(async (resolve,reject)=>{

            let upload_len = images.length , upload_res = new Array();

            images.forEach(async image => {
                let filePath = image.path;

                await cloudinary.v2.uploader.upload(filePath, function(error,result){
                    if(upload_len === upload_res.length){
                        resolve(upload_res);
                    }else if(error){
                        reject(error);
                    }else if(result){

                        upload_res.push(result.public_id);

                    }
                })
            });
        }).then((result) => result)
        .catch((error)=>error)

        let upload = await multiple_uploads;

        res.status(200).json({response: upload});
        
    }
    getCarImages(req, res, next) {

        cloudinary.v2.api.resources(
            function (err, result) {
                if (err) { res.status(404).json(err) }

                res.status(200).json(result);
            }
        )
    }

    getCarImage(req, res, next) {
        let imageId = req.params.id;

        cloudinary.v2.api.resources_by_ids([imageId],
            function (err, result) {
                if (err) {
                    res.status(404).json(err);
                }
                res.status(200).json(result);

            }
        )
    }

    deleteCarImage(req, res, next) {
        let imageId = req.params.id;

        cloudinary.v2.uploader.destroy(imageId, function (error, result) {

            if (error) { res.status(404).json(err) }

            res.status(200).json(result);
        });
    }
}

export default new CarController();
