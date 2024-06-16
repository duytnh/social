import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

function VideoChat({ roomId }) {
    const [stream, setStream] = useState(null);
    const [peers, setPeers] = useState([]);
    const videoRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                videoRef.current.srcObject = currentStream;

                const newPeer = new Peer({
                    initiator: window.location.hash === `#${roomId}`,
                    trickle: false,
                    stream: currentStream
                });

                newPeer.on('signal', (data) => {
                    console.log('SIGNAL', JSON.stringify(data));
                });

                newPeer.on('stream', (remoteStream) => {
                    addPeer(newPeer);
                    if (videoRef.current) {
                        videoRef.current.srcObject = remoteStream;
                    }
                });

                if (window.location.hash !== `#${roomId}`) {
                    newPeer.signal({ type: 'join', roomId });
                }
            })
            .catch((err) => console.error('Error accessing media devices:', err));

        return () => {
            if (peers.length > 0) {
                peers.forEach(peer => peer.destroy());
            }
        };
    }, [roomId]);

    const addPeer = (newPeer) => {
        setPeers((prevPeers) => [...prevPeers, newPeer]);
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline muted />
            <div>
                {peers.map((peer, index) => (
                    <video key={index} ref={videoRef} autoPlay playsInline />
                ))}
            </div>
            <button onClick={() => peers.forEach(peer => peer.destroy())}>Thoát phòng</button>
        </div>
    );
}

export default VideoChat;
