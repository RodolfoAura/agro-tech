const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const create = async (req, res) => {
    var info = req.body

    info.senha = await bcrypt.hash(req.body.senha, 10)

    let user = await prisma.usuario.create({
        data: info
    })
    res.status(201).json(user).end()
}


const login = async (req, res) => {
    const user = await prisma.usuario.findFirst({

        where:{ email: req.body.email }
    })

    if (user) { console.log(user)
        if (await bcrypt.compare(req.body.senha, user.senha)) {
            var result = user
            jwt.sign(result, process.env.KEY, { expiresIn: '12h' }, function (err, token) {
    
                if (err == null) {
               
                    result["token"] = token
                    res.status(200).json({ result }).end()
                } else {
                    res.status(404).json(err).end()
                }
            })
        }

    }else{
        res.status(404).json({"menssagem":"error"}).end()
    }
}




module.exports = {
    create,
    login
}