
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


let initialState = {
    postData: [
      {id: 1, message: 'Hello', likesCount: 0},
      {id: 2, message: 'I want car', likesCount: 110},
      {id: 3, message: 'Hello', likesCount: 10},
      {id: 4, message: 'Its my firts post', likesCount: 1},
    ],
    newPostText: 'Hi'
  };

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
                };
            return {
                ...state,
                postData:[...state.postData, newPost], 
            //state.postData.push(newPost);
            newPostText:'',
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            };
        default: 
            return state;    
    }
    
    // if (action.type === ADD_POST) {
    //     let newPost = {
    //     id: 5,
    //     // id: length(state.profilePage.postData)-1, 
    //     message: state.newPostText,
    //     likesCount: 0
    //     }
    //    state.postData.push(newPost);
    //    state.newPostText = '';
    // } else if (action.type === UPDATE_NEW_POST_TEXT) {
    //     state.newPostText = action.newText; 
    // }     
    // return state;
}


export let addPostActionCreator = () => {
    return {
      type: ADD_POST
    }
  }  
export let updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;