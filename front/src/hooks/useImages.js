import axios from 'axios';

export const useImages = () => {
    const getPage = async (page) => {
        const res = await axios
            .get('http://localhost:5000/page/' + page)
            .catch(console.log);

        return res.data.images || false;
    }

    const deleteImage = async (filename) => {
        const res = await axios
            .delete('http://localhost:5000/file/' + filename)
            .catch(console.log);

        return res.data ? true : false;
    }

    return {
        getPage,
        deleteImage
    }
}