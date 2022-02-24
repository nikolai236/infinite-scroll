const fs = require('fs');
const path = require('path');

const getImage = (filename, res) => {
    const read = fs.createReadStream(
        path.resolve(__dirname, '..', 'images', filename)
    );
    
    return new Promise((resolve, reject) => {
        read.on('data', (chunk) => {
            res.write(chunk);
        });

        read.on('error', () => {

           res.status(404).send(err);
            reject(err)
        });

        read.on('end', () => {
            res.end();
            resolve()
        })
        .catch(console.log);
    });
}

const getSingleImage = async (req, res) => {
    try {
        await getImage(req.params.filename, res);
    } catch(err) {
        console.log(err);

        res.status(404);
    }
}

const getPage = async (req, res) => {
    try {

        const { num } = req.params;
        const dir = fs
            .readdirSync(path.resolve(__dirname, '..', 'images'))
            .slice(num, num + 5);

        res.json({ dir });

    } catch (err) {
        console.log(err);

        res.status(404);
    }
}

const deleteImage = async (req, res) => {
    try {
        const { name } = req.params;
        const filename = path.resolve(__dirname, '..', 'images', name);

        if(fs.existsSync(filename)) {
            fs.rmSync(filename, { force: true });

            return res.json({ messgae: 'succes' });
        }
    } catch (err) {
        console.log(err);

        res.status(404);
    }
}

module.exports = {
  getPage,
  deleteImage,
  getSingleImage
}
