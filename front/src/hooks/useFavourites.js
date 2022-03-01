import axios from 'axios';

export const useFavourites = () => {

    const getNumberOfFavourites = async (page) => {

        const likes = await axios
            .get('http://localhost:5000/favourites/' + page)
            .catch(console.log);

        return likes.data;
    }

    const addFavourite = async (name) => {

        const res = await axios
            .get('http://localhost:5000/favourites/' + name)
            .catch(console.log);

        if(res.data) return true;
        return false;
    }

    const removeFavourite = async (name) => {

        const res = await axios
            .delete('http://localhost:5000/favourites/' + name)
            .catch(console.log);

        if(res.data) return true;
        return false;
    }

    return {
        getNumberOfFavourites,
        addFavourite,
        removeFavourite,
    }
}
