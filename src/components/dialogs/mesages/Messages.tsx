import MessagesCSS from './Messages.module.css';
import React from 'react';

type PropsType = {
  message: string
}
const Messages: React.FC<PropsType> = (props) => {
    return (
    <div className={MessagesCSS.names}>
        {props.message}
    </div>
    )
  }

export default Messages;