import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

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
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    _callSubscriber() {

    },
    dispatch(action) {
        this._state.profilePosts = profileReducer(this._state.profilePosts, action);
        this._state.msgPage = dialogsReducer(this._state.msgPage, action);
        this._callSubscriber(this._state);
    }
}

export default store;