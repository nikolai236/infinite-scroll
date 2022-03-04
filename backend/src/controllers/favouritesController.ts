import * as db from '../models/Favorites.js';

import { Request, Response } from 'express';

export const addFavourite = (req: Request, res: Response) => {
    try {
        const { filename } = req.params;

        db.addLikeToImage(filename);

        return res.send({ success: true });

        //throw new Error('Couldnt like image');
    } catch(err) {
        console.log(err);

        res.status(404);
    }
}

export const removeFavourite = (req: Request, res: Response) => {
    try {
        const { filename } = req.params;

        db.removeLikeFromImage(filename);

        return res.send({ success: true });

        //throw new Error('Couldnt remove like from image');
    } catch(err) {
        console.log(err);

        res.status(404);
    }
}