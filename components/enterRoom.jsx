'use client'
const EnterRoom=({setUserName,setRoom,setJoined})=>{
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target[0].value.trim();
        const roomId = e.target[1].value.trim();

        if (name && roomId) {
            setUserName(name);
            setRoom(roomId);
            setJoined(true);
        } else {
            alert("Please enter both your name and room ID.");
        }
    };
    return(
        <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold mb-4">Enter Room</h1>
                <input
                    type="text"
                    placeholder="Your Name"
                    className="p-2 border border-gray-300 rounded mb-4 w-64"
                />
                <input
                    type="text"
                    placeholder="Room ID"
                    className="p-2 border border-gray-300 rounded mb-4 w-64"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Join Room
                </button>
            </div>
        </form>
        </>
    )
}
export default EnterRoom;