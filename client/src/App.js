import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './pages/home';
import PlayRoom from "./pages/playRoom";
import './App.css';

const App = () => {

    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/play-room">
                        <PlayRoom
                            roomId={roomId}
                            userName={userName}
                        />
                    </Route>
                    <Route path="/">
                        <Home
                            roomId={roomId}
                            setRoomId={setRoomId}
                            userName={userName}
                            setUserName={setUserName}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
