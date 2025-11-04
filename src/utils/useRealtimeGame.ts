import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeGame(roomId: string, playerName: string, onMove: (col: number) => void) {
  const [playersCount, setPlayersCount] = useState(0);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId || !playerName) return;

    const ch = supabase.channel(`game:${roomId}`, {
      config: { presence: { key: playerName } },
    });

    ch.on('presence', { event: 'sync' }, () => {
      const users = ch.presenceState();
      const count = Object.keys(users).length;
      setPlayersCount(count);
    });

    ch.on('broadcast', { event: 'move' }, (payload) => {
      onMove(payload.payload.col);
    });

    ch.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await ch.track({ player: playerName });
      }
    });

    setChannel(ch);
    return () => {
      ch.unsubscribe();
    };
  }, [roomId, playerName, onMove]);

  const sendMove = (col: number) => {
    channel?.send({
      type: 'broadcast',
      event: 'move',
      payload: { col },
    });
  };

  return { sendMove, playersCount };
}