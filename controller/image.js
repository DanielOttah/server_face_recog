const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '474cf84726c6449bab79e6f23973b798'
});


const handleApiCall = (req, res) => {

    // // This part has been updated with the recent Clarifai changed. Used to be:
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        //     //OR
        // app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.status(200).json(entries[0]);
        })
        .catch(err => res.status(400).json("Error"))

}
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}