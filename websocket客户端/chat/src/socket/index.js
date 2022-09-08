import io from 'socket.io-client'
import { useStore } from 'vuex';

const socket = io('ws://localhost:4000');


export default socket