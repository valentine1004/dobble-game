import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import socket from "../../utils/socket";
import {API_URL} from "../../consts";

const Home = ({roomId, setRoomId, userName, setUserName}) => {
    let history = useHistory();

    useEffect(() => {
        console.log('env', process.env);
    }, []);

    const startGame = async () => {
        if(roomId.trim() && userName.trim()){
            const res = await fetch(`${API_URL}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userName, roomId})
            });
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }else{
                const result = await res.json();
                if(result['joined']){
                    socket.emit('room:join', {userName, roomId});
                    history.push('/play-room');
                }else{
                    alert('This room is full, please connect to another');
                }
            }
        }
    }

    return (
        <div className='home-wrapper'>
            <div className='form-wrapper'>
                <h3 className='form-title'>Dobble</h3>
                <div>
                    <input
                        type='text'
                        placeholder='Room ID'
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className='input-field'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Your name'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='input-field'
                    />
                </div>
                <div className='start-game-wrapper'>
                    <div className='start-game-btn' onClick={startGame}>Start</div>
                </div>
            </div>
        </div>
    )
}

export default Home;