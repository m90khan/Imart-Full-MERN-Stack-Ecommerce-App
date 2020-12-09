import express from 'express';
const uploadRouter = express.Router();
import { upload } from '../controllers/uploadCtrl.js';

uploadRouter.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
