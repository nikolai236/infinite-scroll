import * as db from '../models/Favorites.js';

export const addFavourite = (req, res) => {
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

export const removeFavourite = (req, res) => {
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