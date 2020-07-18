const handleSignIn = (req, res, db, bcrypt) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json('Incorrect form submited')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.status(200).json(user[0])
                    })
            } else {
                res.status(400).json("Unable to get user")
            }
        })
        .catch(err => res.status(400).json("Please enter valid credentials"))
}

module.exports = {
    handleSignIn: handleSignIn
}