import React, { useState } from 'react'
import RoomForm from '../../../components/VideoChat/Room';
import VideoChat from '../../../components/VideoChat/Video';

function RoomVideoChat() {
    const [roomId, setRoomId] = useState(null);

    const handleRoomIdSet = (id) => {
        setRoomId(id);
    };
    return (
        <div>
            {!roomId ? (
                <RoomForm onRoomIdSet={handleRoomIdSet} />
            ) : (
                <VideoChat roomId={roomId} />
            )}
        </div>
    )
}

export default RoomVideoChat
