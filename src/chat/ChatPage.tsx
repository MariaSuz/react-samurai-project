import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startMessagesListening, stopMessagesListening, sendMessage } from "../redux/chat-reducer.ts";
import { AppDispatch } from "../redux/redux-store";
import { getMessagesChat } from "../redux/users-selectors.ts";
import { Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
          dispatch(stopMessagesListening());
        };
      }, [dispatch]);

      return (
        <Container>
            <Box sx={{  textAlign: 'center'}}>
                <Typography variant="h6" component="h2">
                    <b>В чате не ругаться, не использовать ненормативную лексику. Используется Websocket. Ответы на сообщения приходят не часто.</b>
                </Typography>
            </Box>
          <Messages />
          <AddMessages />
        </Container>
      );
};

// const Messages: React.FC = () => {
//     const messages = useSelector(getMessagesChat);
//     // const [messages, setMessages] = useState<ChatMessageType[]>([])
//     // useEffect(() => {
//     //     ws.addEventListener('message', (e) => {
//     //         let newMessages = JSON.parse(e.data)
//     //         setMessages((prevMessages) => [...prevMessages, ...newMessages])
//     //     })
//     // }, []);

//     return <div style = {{ height: '400px', overflowY: 'auto'}}>
//         {messages.map((m, index) => <Message key={index} message={m} />)}
//     </div>
// }
const Messages: React.FC = (props) => {
    const messages = useSelector(getMessagesChat);
    return (
    <Box sx={{ height: "400px", overflowY: "auto", marginBottom: 2 }}>
      <List>
        {messages.map((m) => (
          <ListItem key={`${m.userId}-${m.message}`}>
            <ListItemAvatar>
              <Avatar src={m.photo} />
            </ListItemAvatar>
            <ListItemText
              primary={m.userName}
              secondary={m.message}
            />
          </ListItem>
        ))}
      </List>
    </Box>
    )
}

const AddMessages: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch:AppDispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessageHandler}
            sx={{ marginTop: 2 }}
          >
            Send
          </Button>
        </Box>
      );
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export default ChatPage;