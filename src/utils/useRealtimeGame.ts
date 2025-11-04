import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeGame(
  roomId: string,
  playerName: string,
  onMove: (move: number) => void
) {
  const [playersCount, setPlayersCount] = useState(0);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId || !playerName) return;

    const channel: RealtimeChannel = supabase.channel(`game:${roomId}`, {
      config: {
        broadcast: { self: false },
        presence: { key: playerName },
      },
    });

    channel.on('presence', { event: 'sync' }, () => {
      const users = channel.presenceState();
      setPlayersCount(Object.keys(users).length);
    });

    channel.on('broadcast', { event: 'move' }, (payload) => {
      const move = payload.payload as number;
      onMove(move);
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ player: playerName });
      }
    });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, [roomId, playerName, onMove]);
  const sendMove = (move: number) => {
    channelRef.current?.send({
      type: 'broadcast',
      event: 'move',
      payload: move,
    });
  };

  return { sendMove, playersCount };
}
