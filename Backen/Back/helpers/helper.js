const multer=require('multer')
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        return cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        const file_name = Date.now() + "-" + file.originalname;
        return cb(null, file_name);
    }
});

const upload = multer({ storage });

module.exports=upload
