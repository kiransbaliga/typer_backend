"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
// Serve a basic HTML page
app.use((0, cors_1.default)({ origin: '*' }));
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    // Listen for a custom event
    socket.on('chat message', (msg) => {
        console.log('Message:', msg);
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });
    socket.on('progress', (data) => {
        console.log('Progress:', data);
        socket.broadcast.emit('progress', data);
    });
    socket.on('gameover', (data) => {
        console.log('Gameover:', data);
        socket.broadcast.emit('gameover', data);
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
//# sourceMappingURL=app.js.map