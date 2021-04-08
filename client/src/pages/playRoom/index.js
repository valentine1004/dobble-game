import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styled from "styled-components";

import Card from "../../components/card";
import {shuffle} from "../../utils/shuffle";
import {images} from "../../assets/imagesInfo";
import socket from "../../utils/socket";

const PLayerNameWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PLayerName = styled.p`
  color: white;
  background: #b2a1a9;
  width: 35%;
  line-height: 2.5;
  border-radius: 10px;
  font-weight: bold;
`;

const PlayRoom = ({roomId, userName}) => {

    const requestImageFile = require.context('../../assets/images', true);

    let history = useHistory();

    const [imagesList, setImagesList] = useState([]);
    const [generalCardIdx, setGeneralIdx] = useState(55);
    const [players, setPlayers] = useState([]);
    const [myCardIdx, setMyCardIdx] = useState(0);
    const [myCards, setMyCards] = useState([]);
    const [cards, setCards] = useState([]);

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

    useEffect(() => {
        socket.on("room:card", data => {
            setGeneralIdx(data.generalCard);
        });
    }, []);

    const selectImage = (checkedImageIdx) => {
        if (players.length < 2) {
            alert('Please wait the opponent');
        } else {
            if (cards[generalCardIdx].includes(checkedImageIdx)) {
                setMyCardIdx(myCardIdx + 1);
                socket.emit('room:card',
                    JSON.stringify({
                        generalCard: cards.findIndex(card => JSON.stringify(card) === JSON.stringify(myCards[myCardIdx])),
                        roomId
                    }));
            }
        }
    }

    useEffect(() => {
        socket.on('room:joined', users => {
            console.log('Players in current game', users);
            setPlayers(users.map(user => user.name));
            setMyCards(users.filter(user => user.name === userName)[0]['cards']);
        });

        socket.on('room:cardsInfo', cardsInfo => {
            setCards(cardsInfo['allCards']);
        });

        socket.on('game:over', data => {
            alert(data);
        });

        return () => {

        }
    }, []);

    useEffect(() => {
        console.log('myCardIdx', myCardIdx);
        if (myCardIdx === myCards.length - 1 && myCardIdx !== 0) {
            socket.emit('game:over', {roomId, message: `Winner ${userName}`});
            history.push('/');
        }
    }, [myCardIdx]);

    const getOpponentName = () => {
        return players.filter(player => player !== userName);
    }

    return (
        <div className='playroom-wrapper'>
            {
                imagesList.length !== 0 && cards.length !== 0 &&
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>
                        <PLayerNameWrapper>
                            <PLayerName>
                                <span>Player: {userName}</span>
                            </PLayerName>
                        </PLayerNameWrapper>
                        <Card
                            imagesList={imagesList}
                            imageIndexes={myCards[myCardIdx]}
                            handleChange={selectImage}
                        />
                    </div>
                    <div>
                        <PLayerNameWrapper>
                            <PLayerName>
                                <span>Player: {getOpponentName()}</span>
                            </PLayerName>
                        </PLayerNameWrapper>
                        <Card
                            imagesList={imagesList}
                            imageIndexes={shuffle(cards[generalCardIdx])}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default PlayRoom;