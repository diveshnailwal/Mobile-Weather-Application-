import { useEffect } from 'react';

export const useWebSocket = (onUpdate: (data: any) => void) => {
  useEffect(() => {
    
    const ws = new WebSocket('ws://192.168.1.6:5000');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data); 
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close(); 
    };
  }, [onUpdate]);
};
