import { LowSync, JSONFileSync } from 'lowdb';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import _ from 'lodash';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface Image {
    name: string;
    likes: number;
}

type DBSchema = { favourites: Image[] };

const adapter = new JSONFileSync<DBSchema>(path.resolve(__dirname, '..', '..', 'db.favourites.json'));
const db = new LowSync(adapter);

db.read();

export const getAllImages = () => db.data.favourites;
export const getImageByName = (name: string) => 
    _.chain(db.data.favourites)
    .find({ name })
    .value();

export const getOrCreateImage = (name: string) => {
    const image = getImageByName(name);
    if(image) return image;

    createImage(name, 0);
    return getImageByName(name);
}

export const getArrayOfImages = (names: string[]) => 
    names.map(name => getImageByName(name));

export const getArrayOfNotNullImages = (names: string[]) => 
    names.map(name => getOrCreateImage(name));

export const getImageLikesByName = (name: string) => 
    getImageByName(name)?.likes || 0;

export const createImage = (name: string, likes: number) => {
    const image = {
        name,
        likes,
    }

    saveImage(image);
}

export const updateImage = (image: Image, edits: Partial<Image>) => {
    const index = db.data.favourites.indexOf(db.data.favourites.filter(item => item === image)[0])

    db.data.favourites[index] = {
        ...db.data.favourites[index],
        ...edits
    }
    
    db.write();
    db.read();
}

export const updateOrCreateImage = (name: string, edits: Partial<Image>) => {
    const image = getImageByName(name);
    if(image) return updateImage(image, edits);

    createImage(name, 0);
    updateImage(getImageByName(name), edits);
}

export const addLikeToImage = (name: string) =>  
    updateOrCreateImage(name, { 
        likes: getImageLikesByName(name) + 1
    });

export const removeLikeFromImage = (name: string) => {
    const image = getImageByName(name);
    const likes = getImageLikesByName(name);

    if(likes > 0) {
        updateImage(image, { 
            likes: likes - 1
        });
    }
}

export const saveImage = (image: Image) => {
    db.data.favourites.push(image);
    db.write();
    db.read();
}

export const removeImage = (image: Image) => {
    const index = db.data.favourites.indexOf(image);

    db.data.favourites.splice(index, 1);
    db.write();
    db.read();
}

export const removeImageByName = (name: string) => 
    removeImage(getImageByName(name));