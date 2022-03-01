import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url'
import * as path from 'node:path';
import * as db from '../models/Favorites.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getImage = async (filename, res) => {
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

export const getSingleImage = async (req, res) => {
    try {
        await getImage(req.params.filename, res);
    } catch(err) {
        console.log(err);

        res.status(404);
    }
}

export const getPage = async (req, res) => {
    try {

        const { page } = req.params;
        const images = fs
            .readdirSync(path.resolve(__dirname, '..', '..', 'images'))
            .slice(page* 5, page*5 + 10)
            .map(name => {
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

export const deleteImage = async (req, res) => {
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


