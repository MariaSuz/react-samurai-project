
let store = {
  _state:  {
    profilePage: { 
      postData: [
        {id: 1, message: 'Hello', likesCount: 0},
        {id: 2, message: 'I want car', likesCount: 110},
        {id: 3, message: 'Hello', likesCount: 10},
        {id: 4, message: 'Its my firts post', likesCount: 1},
      ],
      newPostText: 'Hi'
    },
    messagesPage: {
      messagesData: [
      {id: 1, message:'Yo brother'},
      {id: 2, message:'How are you doing?'},
      {id: 3, message:'My name is beautiful'},
      {id: 4, message:'Im champion!'},
    ],
    dialogsData: [
      {id: 1, names: 'Mr. Tomatos'},
      {id: 2, names: 'Mrs. Smith'},
      {id: 3, names: 'Dima'},
      {id: 4, names: 'Limanado'},
      {id: 5, names: 'PizzaLiker'},
      {id: 6, names: 'Alien'},
    ],
    newPostMessage: '' 
    },
    sidebar: {
      sidebarData: [
      'Limanado',
      'PizzaLiker',
      'Alien',
    ]
  }
  },

  _callSubscriber() {
    console.log('State changed')
  },

  getState() {
    return this._state;
  },

 subscribe(observer)  {
    this._callSubscriber = observer; //observer - это наблюдатель (типа addEventListner)
  },

  dispatch (action) {
     if (action.type === 'ADD-POST') {
        let newPost = {
          id: 5,
          // id: length(state.profilePage.postData)-1, 
          message: this._state.profilePage.newPostText,
          likesCount: 0
        }
        this._state.profilePage.postData.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
      } if (action.type === 'UPDATE-NEW-POST-TEXT') {
        this._state.profilePage.newPostText = action.newText; 
        this._callSubscriber(this._state)
      } 
      if(action.type === 'ADD-MESSAGES') {
        let newMessage = {
          id: 5, 
          message:  this._state.messagesPage.newPostMessage,
        };
        this._state.messagesPage.messagesData.push(newMessage);
        this._callSubscriber(this._state);
      }
      if(action.type === 'UPDATE-NEW-POST-MESSAGES') {
        this._state.messagesPage.newPostMessage = action.newText; 
        this._callSubscriber(this._state)
      }
  }

}


//Это чтобы видеть стейт глобально! как изменяется
window.state = store;

export default store;