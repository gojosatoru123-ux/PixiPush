import { createServer } from 'node:http';
import  next  from 'next';
import { Server } from "socket.io"
import { time } from 'node:console';

const dev = process.env.NODE_ENV !== 'production';
const hostname=process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || "3000",10);

const app= next({ dev, hostname, port });
const handle = app.getRequestHandler();

const userRooms = new Map(); // socket.id -> { userName, room }

app.prepare().then(() => {
    const httpServer=createServer(handle);
    const io = new Server(httpServer);
    io.on('connection', (socket) => {

        socket.on('join-room',({room,userName})=>{
            socket.join(room);
            userRooms.set(socket.id, { userName, room });
            socket.to(room).emit('user_joined', `${userName} has joined the room.`);
        })

        socket.on('message',({room,message,sender,time})=>{
            socket.to(room).emit('message', { sender, message,time });
        });

        socket.on('leave-room', () => {
            const userData = userRooms.get(socket.id);
            if (userData) {
                const { userName, room } = userData;
                socket.to(room).emit('user_left', `${userName} has left the room.`);
                socket.leave(room);
                userRooms.delete(socket.id);
            }
        });

        socket.on('disconnect', () => {
        });
    })
    httpServer.listen(port, hostname, () => {
    }
    );
})