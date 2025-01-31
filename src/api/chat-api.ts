let subbcribers = [] as SubsciberType[]

export const chatAPI = {
    subscibe(callback: SubsciberType) {
        subbcribers.push(callback)
        return () => {
            subbcribers = subbcribers.filter(s => s !== callback);
        }
    },
    unubscibe(callback: SubsciberType) {
        subbcribers = subbcribers.filter(s => s !== callback);
    },
    sendMessage(message:string) {
        ws?.send(message)
    },
    start() {
        createChannel()
    },
    stop() {
        subbcribers = [];
        ws?.removeEventListener('close', closeHandler);
        ws?.removeEventListener('message', messageHandler);
        ws?.close();
    }
}

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('CLOSE WebSocket')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subbcribers.forEach(s => s(newMessages));
  };

function createChannel() {
    if (ws) {
        ws.removeEventListener('close', closeHandler);
        ws.removeEventListener('message', messageHandler);
        ws.close();
    }
    
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
}


type SubsciberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}