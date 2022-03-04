import axios from 'axios';

export interface Image {
    name: string;
    likes: number;
}

export const useImages = () => {
    const getPage = async (page: number): Promise<Image[]|boolean> => {
        const res = await axios
            .get('http://localhost:5000/page/' + page)
            .catch(console.log);

        return res && (res.data.images || false);
    }

    const deleteImage = async (filename: string) => {
        const res = await axios
            .delete('http://localhost:5000/file/' + filename)
            .catch(console.log);

        return res && (res.data ? true : false);
    }

    return {
        getPage,
        deleteImage
    }
}