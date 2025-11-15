type PriceUpdate = {
  id: string;
  price: number;
};

type Listener = (update: PriceUpdate) => void;

class MockSocket {
  private listeners: Listener[] = [];

  connect() {
    setInterval(() => {
      const update: PriceUpdate = {
        id: `token-${Math.floor(Math.random() * 60) + 1}`,
        price: 0.05 + Math.random() * 0.5,
      };
      this.listeners.forEach((cb) => cb(update));
    }, 2000);
  }

  subscribe(cb: Listener) {
    this.listeners.push(cb);
  }
}

export const socket = new MockSocket();
socket.connect();
