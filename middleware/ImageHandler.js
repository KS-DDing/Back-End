import multer from 'multer';
import path from 'path';

const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'thumbnail') cb(null, './images/thumbnails');
    else if (file.fieldname === 'contentImages') cb(null, './images/contentImages/');
    else {
      cb(null, false);
    }
  },
  filename: (req, file, cb) => {
    //extname: 확장자 추출
    //Date.valueOf: 원시값 가져옴.
    cb(null, Date.now().valueOf() + path.extname(file.originalname));
  },
});

// const contentStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images/content/');
//   },
//   filename: (req, file, cb) => {
//     //extname: 확장자 추출
//     //Date.valueOf: 원시값 가져옴.
//     cb(null, Date.now().valueOf() + path.extname(file.originalname));
//   },
// });

export default multer({ fieldname: 'thumbnail', storage: thumbnailStorage, fileSize: 5 * 1024 * 1024 });
// export const contentUpload = multer({ fieldname: 'images', storage: contentStorage, fileSize: 5 * 1024 * 1024 });
