
const handleRegister = (req, res, bcrypt, db) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json('Incorrect form submited')
    }
    const hash = bcrypt.hashSync(req.body.password);
    //nd transaction here is used so that all entries are covered i.e. if error occurs in entering password all other fields fail as well
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        }).into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users').returning('*').insert({
                    name: req.body.name,
                    email: loginEmail[0],
                    joined: new Date()
                }).then(user => {
                    res.status(201).json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json(err.detail));
}

module.exports = {
    handleRegister: handleRegister
};