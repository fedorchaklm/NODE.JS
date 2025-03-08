import express from 'express';
import {userService} from "./services/user.service.js";

const app = express();

const PORT = 5100;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const data = await userService.getAll();
    res.json(data)
})
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userService.getById(id);
    res.json(data)
})
app.post('/users', async (req, res) => {
    const user = req.body;
    const data = await userService.create(user);
    res.json(data)
})

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userService.updateById(id, req.body);
    res.json(data)
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await userService.deleteById(id);
    res.json({message: 'Deleted user'})
})

app.listen(PORT, () => {
    console.log(`Server is running on 'http://localhost:${PORT}'`);
})