import FriendsListCSS from'./FriendsList.module.css';


function FriendsList(props) {
    // let newside = props.names.map( el => {
    //     <span className={FriendsListCSS.spantext}>{el.names}</span>
    //  })
    return (
       <span className={FriendsListCSS.spantext}>{props.names + ''}</span>
    )
  }

  export default FriendsList;