const express = require('express')

const router = express.Router()

const motorista = require('../controllers/controllermotoristas')
const middleware = require('../middleware/middleware')


router.post('/createMotorista',motorista.create)
router.get('/readMotorista', motorista.read)
router.delete('/deleteMotorista/:id',motorista.del)
router.put('/putMotorista/:id',motorista.update)

const manutencao = require('../controllers/controllerManutencoes')

router.post('/createManutencao', manutencao.create)
router.get('/readManutencao', manutencao.read)
router.delete('/deleteManutencao/:id' , manutencao.del)
router.put('/putManutencao/:id', manutencao.update)

const operacao = require('../controllers/controlleroperacao')

router.post("/createOperacao", operacao.create)
router.get("/readOperacao", operacao.read)
router.put("/putOperacao/:id", operacao.update)
router.delete("/deleteOperacao/:id", operacao.del)

const users = require('../controllers/controllerusuario')

router.post('/createUser',users.create)
router.post('/loginUser',users.login)

const frota = require('../controllers/controllerveiculo')

router.post('/createVeiculo', frota.create)
router.get('/readVeiculo',frota.read)
router.delete('/deleteVeiculo/:id', frota.del)
router.put('/putVeiculo/:id', frota.update)

module.exports = router