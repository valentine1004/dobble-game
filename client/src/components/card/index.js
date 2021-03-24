import React from "react";
import styled from 'styled-components';

import {randomInteger} from "../../utils/randomInteger";

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
  border-radius: 50%;
  height: 300px;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
`;

const Card = ({imagesList, imageIndexes}) => {
    return(
        <Wrapper>
            {
                imageIndexes.map(id => {
                    return(
                        <div key={id}>
                            <img
                                alt={imagesList[id].name}
                                src={imagesList[id].src}
                                width={randomInteger(50, 110)}
                                style={{transform: `rotate(${randomInteger(-90, 90)}deg)`}}
                            />
                        </div>
                    )
                })
            }
        </Wrapper>
    )
}

export default Card;