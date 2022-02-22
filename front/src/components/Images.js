import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import ImageContainer from './ImageContainer';

export default function Images() {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [favourites, setFavourites] = useState([]);
    const { getPage, deleteImage } = useApi();
    

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
            setImages(images.filter(i => i !== name));
        }
        setLoading(false);
    }

    const handleAddFavourite = e => {
        const { name } = e.target;

        if(!favourites) return;

        console.log(favourites);
        if(favourites.includes(name)) {
            setFavourites(favourites.filter(i => i !== name));

            e.target.checked = false;
        } else {
            setFavourites( prev => {
                prev.push(name)
                return prev;
            });
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
                            id={image}
                            onLoad={() => onLoad(i)}
                        />
                        <div className='btn-group mb-3 d-block'>
                            <button
                                type='button'
                                name={image}
                                className='btn btn-danger mr-3 position-sticky'
                                onClick={handleDelete}
                            > delete</button>
                            <input 
                                type='radio'
                                name={image}
                                //className=''
                                onClick={handleAddFavourite}
                                //defaultChecked={false}
                            />
                        </div>
                    </div>
                )
            }
            {loading && <div>Loading...</div>}
        </div>
    )
}

