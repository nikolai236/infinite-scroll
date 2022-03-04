import axios from 'axios';
import { Image } from './useImages';

export const useFavourites = () => {

    const addFavourite = async (name: string) => {

        const res = await axios
            .get('http://localhost:5000/favourites/' + name)
            .catch(console.log);

        if(res && res.data) return true;
        return false;
    }

    const removeFavourite = async (name: string) => {

        const res = await axios
            .delete('http://localhost:5000/favourites/' + name)
            .catch(console.log);

        if(res && res.data) return true;
        return false;
    }

    return {
        addFavourite,
        removeFavourite,
    }
}
