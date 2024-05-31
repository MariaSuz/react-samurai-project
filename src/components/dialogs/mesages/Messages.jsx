import MessagesCSS from './Messages.module.css';


function Messages(props) {
    return (
    <div className={MessagesCSS.names}>
        {props.message}
    </div>
    )
  }

export default Messages;