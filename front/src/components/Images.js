import { useEffect, useState } from 'react';
import { useImages } from '../hooks/useImages';
import ImageContainer from './ImageContainer';
import { useFavourites } from '../hooks/useFavourites';

export default function Images() {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [favourites, setFavourites] = useState([]);
    const { getPage, deleteImage } = useImages();
    const { addFavourite, removeFavourite } = useFavourites();

    console.log(images);

    useEffect(() => {
        (async () => {

            setLoading(true);
            const p = await getPage(page);
            setImages(prev => prev.concat(p));
            setLoading(false);
        })();
    }, [page]);


    const onLoad = (i) => {
        if(i === images.length -1 ) {
            setPage(prev => prev + 1);
        }
    }


    const handleDelete = async (e) => {
        e.preventDefault();

        const { name } = e.target;

        setLoading(true);
        const done = await deleteImage(name);

        if(done) {
            setImages(images.filter(i => i.name !== name));
        }
        setLoading(false);
    }

    const handleAddFavourite = async (e) => {
        const { name } = e.target;

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

            e.target.checked = false;
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

            console.log(images);

            e.target.checked = true;
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
                            <input 
                                type='radio'
                                name={image.name}
                                //className=''
                                onClick={handleAddFavourite}
                                //defaultChecked={false}
                            />
                            <label>likes: {image.likes} </label>
                            
                        </div>
                    </div>
                )
            }
            {loading && <div>Loading...</div>}
        </div>
    )
}

