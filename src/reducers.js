
export default function(state = {}, action) {
    if (action.type === 'GET_FRIENDS') {
        state = Object.assign({}, state, { friends: action.friends });
    }
    // if (action.type === 'END_FRIENDS') {
    //     state = Object.assign({}, state, { recipient_id: action.recipient_id });
    // }
    return state; //to check if you successfully updated the state, console log "state" right before return
}




// class Friends extends Component {
//     componentDidMount() {
//         //dispatch an action
//         this.props.dispatch(getFriends())
//     }
//
//     render() {
//         console.log( this.props.friends )
//         return (
//             <div>Friends</div>
//         )
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         friends: state.friends
//     }
// }
//
// export default connect(mapStateToProps)(Friends)
// // auto passes dispatch() to props
// // this.props.dispatch()
//
// ///////
// // actions.js
//
//
// function terminateFriendship (otherUserId) {
//     return axios.post('/terminate-friendship', { otherUserId })
//     .then(resp => {
//         return {
//             type: 'TERMINATE_FRIENDSHIP',
//             otherUserId
//         }
//     })
// }
//
//
//
// ///////
// // reducer.js
//
// export default function reducer(state = {}, action) {
//     if (action.type === 'GET_FRIENDS') {
//         state = Object.assign({}, state, {
//             friends: action.friends
//         })
//     }
//
//     if (action.type === 'TERMINATE_FRIENDSHIP') {
//         // filter out the friend that was terminated from the
//         // list of friends - probably need Array.filter() or Array.reduce()
//     }
//
//     return state
// }
//
// /// next step: jump to top and see mapStateToProps
