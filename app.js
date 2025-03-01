import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 5100;

const users = [
    {
        name: "Bob 1",
        age: 14,
        gender: "male"
    },
    {
        name: "Bob 2",
        age: 4,
        gender: "female"
    },
    {
        name: "Bob 3",
        age: 11,
        gender: "other"
    },
    {
        name: "Bob 4",
        age: 1,
        gender: "male"
    },
    {
        name: "Bob 5",
        age: 12,
        gender: "female"
    },
    {
        name: "Bob 6",
        age: 12,
        gender: "other"
    }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res,) => {
    const user = req.body;
    users.push(user);
    res.status(201).json({message: "Added user"});
});

app.put('/users/:id', (req, res,) => {
    const {id} = req.params;
    const user = req.body;
    users[+id] = user;
    res.status(200).json({message: "User changed", data: user});
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const deletedUser = users[+id];
    users.splice(+id, 1)
    res.status(200).json({message: "User deleted", data: deletedUser});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});