const handleProfile = (res, req, db) => {
    const { id } = req.params
    db('users').where({
        id: id
    }).select('*')
        .then(user => {
            if (user.length) {
                res.status(200).json(user[0]);
            } else {
                res.status(404).json("No user with given id")
            }
        })

}
module.exports = {
    handleProfile: handleProfile
}