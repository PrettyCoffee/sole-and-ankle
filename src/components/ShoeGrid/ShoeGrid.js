import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeCard key={shoe.slug} {...shoe} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 36px;
  row-gap: 62px;
  > a {
    flex: 1 1 275px;
    img {
      width: 100%;
    }
  }
`;

export default ShoeGrid;
