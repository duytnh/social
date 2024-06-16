import React, { useState } from 'react';

function RoomForm({ onRoomIdSet }) {
    const [roomIdInput, setRoomIdInput] = useState('');

    const handleJoinRoom = () => {
        if (roomIdInput.trim() !== '') {
            onRoomIdSet(roomIdInput);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nhập ID phòng"
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Tham gia phòng</button>
        </div>
    );
}

export default RoomForm;
