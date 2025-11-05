import { useEffect, useRef, useState } from 'react';
import Peer, { type DataConnection } from 'peerjs';


export function usePeerGame(isHost: boolean, peerId?: string) {
    const peerRef = useRef<Peer | null>(null);
    const connRef = useRef<DataConnection | null>(null);
    const [connected, setConnected] = useState(false);
    const [myId, setMyId] = useState<string | null>(null);

    useEffect(() => {
        // создаём peer
        const peer = new Peer(undefined, {
            host: '0.peerjs.com',
            port: 443,
            secure: true,
        });
        peerRef.current = peer;

        peer.on('open', (id) => {
            console.log('Мой peer ID:', id);
            setMyId(id);
            if (isHost) {
                console.log('Ожидаем подключения второго игрока...');
            } else if (peerId) {
                const conn = peer.connect(peerId);
                connRef.current = conn;
                conn.on('open', () => setConnected(true));
                conn.on('data', (data) => handleData(data));
            }
        });
        peer.on('connection', (conn) => {
            console.log('Игрок подключился:', conn.peer);
            connRef.current = conn;
            conn.on('open', () => setConnected(true));
            conn.on('data', (data) => handleData(data));
        });

        const handleData = (data: any) => {
            console.log('Получено от соперника:', data);
            if (typeof data === 'object' && data.type === 'move') {
                onMoveCallback?.(data.col);
            }
        };

        return () => {
            peer.destroy();
        };
    }, []);

    let onMoveCallback: ((col: number) => void) | null = null;

    const onMove = (cb: (col: number) => void) => {
        onMoveCallback = cb;
    };

    const sendMove = (col: number) => {
        connRef.current?.send({ type: 'move', col });
    };

    return { myId, connected, sendMove, onMove };
}