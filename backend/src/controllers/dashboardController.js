module.exports = {
    show(req, res){
        const user = req.user

        return res.send(user)
    }
}