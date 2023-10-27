import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Serve a basic HTML page
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

// Handle WebSocket connections
io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    // Listen for a custom event
    socket.on('chat message', (msg: string) => {
        console.log('Message:', msg);

        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });
    socket.on('progress',(data:number)=>{
        console.log('Progress:',data);
        socket.broadcast.emit('progress',data);
    })
    socket.on('gameover',(data:any)=>{
        console.log('Gameover:',data);
        socket.broadcast.emit('gameover',data);
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
