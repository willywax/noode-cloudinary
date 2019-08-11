import multer  from 'multer';

const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req,file, callback)=>{
        const name = file.originalname;
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name)
    }
});

export default multer({storage: storage}).array('images',5);

