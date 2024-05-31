import {rerenderEntireTree} from '../render'; 
// let dialogsData = [
//     {id: 1, names: 'Mr. Tomatos'},
//     {id: 2, names: 'Mrs. Smith'},
//     {id: 3, names: 'Dima'},
//     {id: 4, names: 'Limanado'},
//     {id: 5, names: 'PizzaLiker'},
//     {id: 6, names: 'Alien'},
//   ]  
  
//   let messagesData = [
//     {id: 1, message:'Yo brother'},
//     {id: 2, message:'How are you doing?'},
//     {id: 3, message:'My name is beautiful'},
//     {id: 4, message:'Im champion!'},
//   ]
  
//   let postData = [
//     {id: 1, message: 'Hello', likesCount: 0},
//     {id: 2, message: 'I want car', likesCount: 110},
//     {id: 3, message: 'Hello', likesCount: 10},
//     {id: 4, message: 'Its my firts post', likesCount: 1},
//   ]
  let state = {
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
    ] 
    },
    sidebar: {
      sidebarData: [
      'Limanado',
      'PizzaLiker',
      'Alien',
    ]
  }
  }

  export let addPost = () => {
    let newPost = {
      id: 5,
      // id: length(state.profilePage.postData)-1, 
      message: state.profilePage.newPostText,
      likesCount: 0
    };
    state.profilePage.postData.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
  }

  export let upDateNewPostTest = (newText) => {
    state.profilePage.newPostText = newText; 
    rerenderEntireTree(state)
  }

  export default state;