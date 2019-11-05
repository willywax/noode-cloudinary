import dotenv from "dotenv";
import imageHandler from "../helpers/imageHandler";

dotenv.config();

class CarController {
  async saveOne(req, res, next) {
    try {
      let images = req.files;

      let upload = await imageHandler.saveOne(images);

      return res.status(200).json({ uploaded: upload });
    } catch (error) {
      return res.status(404).json({ error });
    }
  }

  async getCarImages(req, res, next) {
    try {
      let results = await imageHandler.getImages();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(404).json(err);
    }
  }

  getCarImage(req, res, next) {
    try {
      let imageId = req.params.id;
      let results = imageHandler.getOneImage(imageId);
      return res.status(200).json(results);
    } catch (error) {
      return res.status(404).json(err);
    }
  }

  async deleteMultipleImages(req, res, next) {
    //let images = req.body.images;
    let images = req.params.id;
    try {
        let results = await imageHandler.deleteMultipleImages(images)

        return res.status(200).json({ deletedImages: results });
      } catch (error) {
        return res.status(404).json(err);
      }
  }
}

export default new CarController();
