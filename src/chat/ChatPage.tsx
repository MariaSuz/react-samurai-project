import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startMessagesListening, stopMessagesListening, sendMessage } from "../redux/chat-reducer.ts";
import { AppDispatch } from "../redux/redux-store";
import { getMessagesChat } from "../redux/users-selectors.ts";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
    const dispatch:AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () =>{
            dispatch(stopMessagesListening())
        }
    })
    return <div>
        <Messages />
        <AddMessages />
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector(getMessagesChat)
    // const [messages, setMessages] = useState<ChatMessageType[]>([])
    // useEffect(() => {
    //     ws.addEventListener('message', (e) => {
    //         let newMessages = JSON.parse(e.data)
    //         setMessages((prevMessages) => [...prevMessages, ...newMessages])
    //     })
    // }, []);

    return <div style = {{ height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m} />)}
    </div>
}
const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: '30px'}}/>  <b> {message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessages: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        ws.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    },[])

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        <p><button onClick={sendMessageHandler}>Send</button></p>
    </div>
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export default ChatPage;