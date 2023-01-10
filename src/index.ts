import { ACCOUNT_TYPE } from './types';
import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

//Retorna todas as contas 
app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})


// Retorna conta pelo id
app.get("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const result = accounts.find((account) => account.id === id)

    res.status(200).send(result)
})


// Deletar conta pelo id 
app.delete("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = accounts.findIndex((account)=> account.id === id)

    if (indexToRemove >= 0){
        accounts.splice(indexToRemove, 1) 
    }

    res.status(200).send("Item deletado com sucesso!")
})

// Alterar dados da conta por id

app.put("/accounts/:id", (req: Request,res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const account = accounts.find((account)=> account.id === id)

    if(account){
        account.id = newId || account.id
        account.ownerName = newOwnerName || account.ownerName
        account.type = newType || account.type

        account.balance =(newBalance === undefined ? account.balance : newBalance)
    }

    res.status(200).send("Atualização feita com sucesso")
}) 
