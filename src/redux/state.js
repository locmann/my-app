const ADD_POST = 'ADD-POST';
const UPDATE_POST_DATA = 'UPDATE-POST-DATA';

let store = {
    _state: {
        msgPage: {
            dialogs: [
                { id: 1, name: "Denis" },
                { id: 2, name: "Vova" },
                { id: 3, name: "Ivan" }
            ],
            messages: [
                { id: 1, message: "Hello" },
                { id: 2, message: "HI" },
                { id: 3, message: "dota" }
            ],
            newMsg: ''
        },
        profilePosts: {
            posts: [
                { id: 1, postMessage: 'hello', likes: 3 },
                { id: 2, postMessage: 'ti loh', likes: 10 }
            ],
            newPostText: 'qwe'
        }
    },
    getMsgPage() {
        return this._state.msgPage;
    },
    getState() {
        return this._state;
    },
    getDialogs() {
        debugger;
        return this._state.msgPage.dialogs;
    },
    getMessages() {
        return this._state.msgPage.messages;
    },
    getNewMsg() {
        return this._state.msgPage.newMsg;
    },
    getPosts() {
        return this._state.profilePosts.posts;
    },
    getNewPostText() {
        return this._state.profilePosts.newPostText;
    },
    addMessage() {
        let newMessage = {
            id: 2,
            message: this._state.msgPage.newMsg
        };
        this._state.msgPage.messages.push(newMessage);
        this._state.msgPage.newMsg = '';
        this._callSubscriber(this._state);//!!!
    },
    updateMessageData(text) {
        this._state.msgPage.newMsg = text;
        this._callSubscriber(this._state);//!!!
    },
    addPost() {
        let newPost = {
            id: 3,
            postMessage: this._state.profilePosts.newPostText,
            likes: 5
        };
        this._state.profilePosts.posts.push(newPost);
        this._state.profilePosts.newPostText = '';
        this._callSubscriber(this._state);//!!!
    },
    updatePostData(text) {
        this._state.profilePosts.newPostText = text;
    
        this._callSubscriber(this._state);//!!!
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    _callSubscriber() {

    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 3,
                postMessage: this._state.profilePosts.newPostText,
                likes: 5
            };
            this._state.profilePosts.posts.push(newPost);
            this._state.profilePosts.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-POST-DATA') {
            this._state.profilePosts.newPostText = action.text;
    
            this._callSubscriber(this._state);
        }
    }
}

export function addPostActionCreator() {
    return {type: ADD_POST}
}

export function updatePostActionCreator(text) {
    let action = {
        type: UPDATE_POST_DATA,
        text: text
    };
    return action;
}

export default store;