import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

class CarController {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    }

    async saveOne(req, res, next) {
        console.log(req.files);
        let images = req.files;

        let multiple_uploads = new Promise(async (resolve, reject) => {

            let upload_len = images.length, upload_res = new Array();

            images.forEach(async image => {
                let filePath = image.path;

                await cloudinary.v2.uploader.upload(filePath, function (error, result) {
                    if(error) { reject(error)}

                    upload_res.push( result.public_id);

                    if(upload_len === upload_res.length){
                        resolve(upload_res)
                    }
                  
                })
            });
        }).then((result) => result)
            .catch((error) => error)

        let upload = await multiple_uploads;

        res.status(200).json({ uploaded : upload });

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

    deleteCarImage(imageId) {

        cloudinary.v2.uploader.destroy(imageId, function (error, result) {

            if (error) { console.log(error) }

            console.log(result)
            //res.status(200).json(result);
        });
    }


    async deleteMultipleImages(req, res, next) {
        let images = req.body.images;

        let deletedImages = [];

        let multiple_deletes = new Promise(async (resolve, reject) => {
            let count = 0;
            images.forEach(async image => {
                await cloudinary.v2.uploader.destroy(image, function (error, result) {
                    if (error) { reject(error) }

                    count += 1;
                    console.log(result.result);
                    (result.result === 'ok') ? deletedImages.push(image) : '';

                    if (count === images.length) {
                        console.log(' Resolved ');
                        resolve(deletedImages);
                    }

                });
            });
        }).then((result) => result)
            .catch((error) => error);

        let result = await multiple_deletes;
        console.log(result);

        res.status(200).json({ deletedImages: result })

    }
}

export default new CarController();
