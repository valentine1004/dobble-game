const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const {cards, shuffle} = require('./helpers');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

const host = '192.168.1.2';
const port = 4001;

let clients = [];
let rooms = new Map();

const shuffledCards = [...shuffle(cards)];
let currentCard = 0;

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    socket.on('room:join', ({roomId, userName}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        let payload = users.map((user, idx) => {
            return(
                {
                    name: user,
                    cards: idx === 0 ? shuffledCards.slice(0, 26) : shuffledCards.slice(26, 52),
                }
            )
        });
        io.sockets.in(roomId).emit('room:joined', payload);
        io.sockets.in(roomId).emit('room:cardsInfo', {generalCard: 55, allCards: shuffledCards});
    });

    socket.on('room:card', (card) => {
        currentCard = JSON.parse(card);
        console.log('Current card: ', currentCard);
        io.in(currentCard.roomId).emit('room:card', {generalCard: currentCard.generalCard});
    });

    socket.on('game:over', (data) => {
        io.in(data.roomId).emit('game:over', data.message);
    });

    // socket.on('room:leave', ({roomId}) => {
    //     socket.leave(roomId);
    //     // rooms.get(roomId).get('users').set(socket.id, userName);
    //     const users = [...rooms.get(roomId).get('users').values()];
    //     console.log('users', users);
    // });

    socket.on('disconnect', () => {
        clients.splice(clients.indexOf(socket.id), 1)
        console.log(`Client with id ${socket.id} disconnected`)
    });
})

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()]
        ]));
        res.status(200).send({joined: true});
    } else {
        if (rooms.get(roomId).get('users').size > 1) {
            res.status(200).send({joined: false});
        } else {
            res.status(200).send({joined: true});
        }
    }
});

http.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)