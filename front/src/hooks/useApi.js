import axios from 'axios';

export const useApi = () => {
    const getPage = async (page) => {
        const res = await axios
            .get('http://localhost:5000/page/' + page)
            .catch(console.log);

        return res.data.dir || false;
    }

    const deleteImage = async (filename) => {
        const res = await axios
            .delete('http://localhost:5000/' + filename)
            .catch(console.log);

        return res.data ? true : false;
    }

    return {
        getPage,
        deleteImage
    }
}