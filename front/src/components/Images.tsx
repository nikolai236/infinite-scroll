import React, { useEffect, useState } from 'react';
import { useImages, Image } from '../hooks/useImages';
import ImageContainer from './ImageContainer';
import { useFavourites } from '../hooks/useFavourites';

export default function Images() {
    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    const [page, setPage] = useState<number>(1);
    const [favourites, setFavourites] = useState<string[]>([]);
    const { getPage, deleteImage } = useImages();
    const { addFavourite, removeFavourite } = useFavourites();

    useEffect(() => {
        (async () => {

            setLoading(true);
            const p = await getPage(page);
            if(typeof p !== 'boolean') setImages(prev => prev.concat(p));
            setLoading(false);
        })();
    }, [page]);


    const onLoad = (i: number) => {
        if(i === images.length -1 ) {
            setPage(prev => prev + 1);
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const button = e.currentTarget;
        const { name } = button;


        setLoading(true);
        const done = await deleteImage(name);

        if(done) {
            setImages(images.filter(i => i.name !== name));
        }
        setLoading(false);
    }

    const handleAddFavourite = async (e: React.MouseEvent<HTMLInputElement>) => {
        const { name } = e.currentTarget;

        if(!favourites) return;

        console.log(favourites);
        if(favourites.includes(name)) {
            setFavourites(favourites.filter(i => i !== name));

            

            await removeFavourite(name);

            const newImages = images.map(i => {
                if(i.name === name) return {
                    name,
                    likes: i.likes - 1,
                }
                return i;
            });
            setImages(newImages);

            const target = e.target as HTMLInputElement;
            target.checked = false;
        } else {
            setFavourites( prev => {
                prev.push(name)
                return prev;
            });

            await addFavourite(name);
            
            const newImages = images.map(i => {
                console.log(i);
                if(i.name === name) return {
                    name,
                    likes: i.likes + 1,
                } 
                return i;
            })
            setImages(newImages);

            const target = e.target as HTMLInputElement;
            target.checked = true;
        }
    }

    return (
        <div className='container' >
            {  
                images.map((image, i) =>
                    <div 
                        key={i} 
                        className='col-lg-8 mb-1 bg-secondary rounded'
                        // style={{ 
                        //     padding: '1% 25%',
                        // }}
                    >
                        <ImageContainer 
                            id={image.name}
                            onLoad={() => onLoad(i)}
                        />
                        <div className='btn-group mb-3 d-block'>
                            <button
                                type='button'
                                name={image.name}
                                className='btn btn-danger mr-3 position-sticky'
                                onClick={handleDelete}
                            > delete</button>
                            <div 
                                //className="form-check"
                            >
                                <input 
                                    type='checkbox'
                                    name={image.name}
                                    //className='form-check-input'
                                    onClick={handleAddFavourite}
                                />
                                <label 
                                    className='form-check-label'
                                    htmlFor={image.name}
                                >likes: {image.likes} </label>
                            </div>
                        </div>
                    </div>
                )
            }
            {loading && <div>Loading...</div>}
        </div>
    )
}

