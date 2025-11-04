import { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeGame(
  roomId: string,
  playerName: string,
  onReceiveMove: (col: number) => void
) {
  const [playersCount, setPlayersCount] = useState(0);
  const [channelReady, setChannelReady] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId || !playerName) return;

    // создаем канал
    const channel = supabase.channel(`game:${roomId}`, {
      config: { presence: { key: playerName } },
    });

    channelRef.current = channel;

    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      console.log('Current presence:', channel.presenceState());
      const count = Object.keys(state).length;
      setPlayersCount(count);
    });

    channel.on('broadcast', { event: 'move' }, (payload) => {
      onReceiveMove(payload.payload.col);
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ player: playerName });
        setChannelReady(true);
      }
    });

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [roomId, playerName, onReceiveMove]);

  const sendMove = (col: number) => {
    if (!channelReady || !channelRef.current) return;
    channelRef.current.send({
      type: 'broadcast',
      event: 'move',
      payload: { col },
    });
  };
  

  return { sendMove, playersCount };
}
