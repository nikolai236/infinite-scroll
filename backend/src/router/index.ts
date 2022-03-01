import { Router } from 'express';

import * as imageController from '../controllers/imageController.js';
import * as favouritesController from '../controllers/favouritesController.js';

const router = Router();

router.get('/file/:filename', imageController.getSingleImage);
router.delete('/file/:filename', imageController.deleteImage);

router.get('/page/:page', imageController.getPage);

router.get('/favourites/:filename', favouritesController.addFavourite);
router.delete('/favourites/:filename', favouritesController.removeFavourite);

export default router;
