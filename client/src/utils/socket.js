import io from "socket.io-client";

import {API_URL} from '../consts';

const socket = io.connect(API_URL, {transports: ['websocket']});

export default socket;