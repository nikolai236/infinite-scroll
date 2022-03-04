import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url'
import * as path from 'node:path';
import * as db from '../models/Favorites.js';

import { Request, Response } from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getImage = async (filename: string, res: Response) => {
    const read = fs.createReadStream(
        path.resolve(__dirname, '..', '..', 'images', filename)
    );
    
    return new Promise((resolve, reject) => {
        read.pipe(res);

        read.on('error', (err) => {

           res.status(404);
           reject(err);
        });

        read.on('end', resolve);
    })
    .catch(console.log);
}

export const getSingleImage = async (req: Request, res: Response) => {
    try {
        await getImage(req.params.filename, res);
    } catch(err) {
        console.log(err);

        res.status(404);
    }
}

export const getPage = async (req: Request, res: Response) => {
    try {

        const page = parseInt(req.params.page);
        const images = fs
            .readdirSync(path.resolve(__dirname, '..', '..', 'images'))
            .slice(page* 5, page*5 + 10)
            .map((name): db.Image => {
                const likes = db.getImageLikesByName(name);

                return {
                    name,
                    likes: likes || 0,
                }
            });

        res.json({ images });

    } catch (err) {
        console.log(err);

        res.status(404);
    }
}

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { filename } = req.params;
        const filepath = path.resolve(__dirname, '..', '..', 'images', filename);

        if(fs.existsSync(filepath)) {
            db.removeImageByName(filename);
            fs.rmSync(filepath, { force: true });

            return res.json({ message: 'succes' });
        }

        throw new Error('Could not delete image');
    } catch (err) {
        console.log(err);

        res.status(404);
    }
}


