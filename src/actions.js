import axios from 'axios';

export function getFriends() {
    return axios.get('/getfriends').then(resp => {
        return {
            type: 'GET_FRIENDS',
            friends: resp.data.friends
        };
    });
}

// export function terminateFriendship(recipient_id) {
//     return axios.post(`/terminatefriendship/${recipient_id}`).then(resp => {
//         return {
//             type: 'END_FRIENDS',
//             recipient_id: resp.data.recipient_id
//         };
//     });
// }
