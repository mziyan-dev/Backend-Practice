import multer from "multer";
import crypto from "crypto";
import path from "path";



// disk storage engine 
// export upload variable



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/upload')
  },
  filename: function (req, file, cb) {
      crypto.randomBytes(12, (err, bytes) => {
     const fn = bytes.toString('hex') + path.extname(file.originalname);
     cb(null, fn)
    })
  }
})

const upload = multer({ storage: storage })

export default upload