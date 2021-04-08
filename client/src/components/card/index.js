import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 4em;
  background: #cac7ce;
  border-radius: 50%;
  height: 300px;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  border: 3px solid #b2a1a9;
  margin: 30px;
`;

const ImageWrapper = styled.div`
  cursor: pointer;
`;

const Card = ({imagesList, imageIndexes, handleChange}) => {
    return(
        <Wrapper>
            {
                imageIndexes.map(id => {
                    return(
                        <ImageWrapper
                            key={id}
                            onClick={_ => handleChange ? handleChange(id) : null}
                        >
                            <img
                                alt={imagesList[id].name}
                                src={imagesList[id].src}
                                width={imagesList[id].width}
                                style={{transform: `rotate(${imagesList[id].rotation}deg)`}}
                            />
                        </ImageWrapper>
                    )
                })
            }
        </Wrapper>
    )
}

export default Card;