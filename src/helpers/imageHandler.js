import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

class ImageHandler {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    }

    async saveOne(images) {
        let multiple_uploads = new Promise(async (resolve, reject) => {

            let upload_len = images.length, upload_res = new Array();

            images.forEach(async image => {
                let filePath = image.path;

                await cloudinary.v2.uploader.upload(filePath, function (error, result) {
                    if(error) { reject(error)}

                    upload_res.push( result.url);

                    if(upload_len === upload_res.length){
                        resolve(upload_res)
                    }

                })
            });
        }).then((result) => result)
            .catch((error) => error)

        let upload = await multiple_uploads;

        return upload;

    }

    async getImages() {
        return await cloudinary.v2.api.resources();
    }

    getOneImage(imageId) {
        try{
            return cloudinary.v2.api.resources_by_ids([imageId])
        }catch(error){
            throw error
        }
    }


    async deleteMultipleImages(img) {

        let deletedImages = [];
        let images = new Array(img);
        let multiple_deletes = new Promise(async (resolve, reject) => {
            let count = 0;
            images.forEach(async image => {
                await cloudinary.v2.uploader.destroy(image, function (error, result) {
                    if (error) { reject(error) }

                    count += 1;
                    (result.result === 'ok') ? deletedImages.push(image) : '';

                    if (count === images.length) {
                        resolve(deletedImages);
                    }

                });
            });
        }).then((result) => result)
            .catch((error) => error);

        let result = await multiple_deletes;
        return result;
    }
}

export default new ImageHandler();
