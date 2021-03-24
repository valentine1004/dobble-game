import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import {shuffle} from "./utils/shuffle";
import {cards} from "./assets/cardsLocation";
import Card from "./components/card";

const images = [
    {name: 'autumn', src: './autumn.png'},
    {name: 'ball', src: './ball.png'},
    {name: 'big-ben', src: './big-ben.png'},
    {name: 'binoculars', src: './binoculars.png'},
    {name: 'box', src: './box.png'},
    {name: 'calendar', src: './calendar.png'},
    {name: 'chaise-longue', src: './chaise-longue.png'},
    {name: 'cheburashka', src: './cheburashka.png'},
    {name: 'clock', src: './clock.png'},
    {name: 'cocktail', src: './cocktail.png'},
    {name: 'contacts', src: './contacts.png'},
    {name: 'crown-pokemon', src: './crown-pokemon.png'},
    {name: 'cursor', src: './cursor.png'},
    {name: 'eiffel-tower', src: './eiffel-tower.png'},
    {name: 'email', src: './email.png'},
    {name: 'facebook', src: './facebook.png'},
    {name: 'fisherman', src: './fisherman.png'},
    {name: 'flippers', src: './flippers.png'},
    {name: 'folder', src: './folder.png'},
    {name: 'footprint', src: './footprint.png'},
    {name: 'gin', src: './gin.png'},
    {name: 'grinch', src: './grinch.png'},
    {name: 'guitar', src: './guitar.png'},
    {name: 'home', src: './home.png'},
    {name: 'idea', src: './idea.png'},
    {name: 'instagram-old', src: './instagram-old.png'},
    {name: 'instagram', src: './instagram.png'},
    {name: 'jerry', src: './jerry.png'},
    {name: 'key', src: './key.png'},
    {name: 'lock', src: './lock.png'},
    {name: 'man', src: './man.png'},
    {name: 'music', src: './music.png'},
    {name: 'news', src: './news.png'},
    {name: 'ninja-turtles', src: './ninja-turtles.png'},
    {name: 'picture', src: './picture.png'},
    {name: 'puzzle', src: './puzzle.png'},
    {name: 'rain', src: './rain.png'},
    {name: 'rainbow', src: './rainbow.png'},
    {name: 'rubbish', src: './rubbish.png'},
    {name: 'search', src: './search.png'},
    {name: 'services', src: './services.png'},
    {name: 'settings', src: './settings.png'},
    {name: 'share', src: './share.png'},
    {name: 'shovel', src: './shovel.png'},
    {name: 'summer-landscape', src: './summer-landscape.png'},
    {name: 'sun', src: './sun.png'},
    {name: 'super-mario', src: './super-mario.png'},
    {name: 'support', src: './support.png'},
    {name: 'swiss-knife', src: './swiss-knife.png'},
    {name: 'sync', src: './sync.png'},
    {name: 'tinder', src: './tinder.png'},
    {name: 'tom', src: './tom.png'},
    {name: 'twitter', src: './twitter.png'},
    {name: 'unblock', src: './unblock.png'},
    {name: 'winter', src: './winter.png'},
    {name: 'woman', src: './woman.png'},
    {name: 'plane', src: './plane.png'}
];

const App = () => {

    const requestImageFile = require.context('./assets/images', true);

    const [imagesList, setImagesList] = useState([]);

    useEffect(() => {
        const uploadedImages = images.map(imageInfo => {
            const staticImage = requestImageFile(imageInfo.src).default;
            return {
                ...imageInfo,
                src: staticImage
            }
        });
        setImagesList(uploadedImages);
    }, [requestImageFile]);

    // useEffect(() => {
    //
    //     socket.on('message', (message) =>
    //         console.log('Message from server: ', message)
    //     )
    //     socket.on('private message', (message) =>
    //         console.log(
    //             'Private message from server: ',
    //             message
    //         )
    //     )
    //
    //     function sendMessageToServer() {
    //         socket.emit('message', "I'm client")
    //     }
    //
    //     sendMessageToServer()
    // },[]);

    useEffect(() => {
        let socket = io.connect('http://127.0.0.1:4001', {transports: ['websocket']});
        socket.on("FromAPI", data => {
            console.log(data);
        });

    }, []);

    return (
        <div className="App">
            {
                imagesList.length !== 0 &&
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Card
                        imagesList={imagesList}
                        imageIndexes={cards[10]}
                    />
                    <Card
                        imagesList={imagesList}
                        imageIndexes={cards[46]}
                    />
                </div>
            }
        </div>
    );
}

export default App;
