import React from 'react';
import styled from 'styled-components/macro';
import { css } from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper variant={variant}>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price sale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === "on-sale" && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const variants = {
  'on-sale': {
    label: "Sale",
    color: COLORS.primary,
  },
  'new-release': {
    label: "Just Released!",
    color: COLORS.secondary,
  },
}

const getVariant = ({ variant }) => {
  const style = variants[variant];
  if (!style) return "";

  return css`
    position: relative;
    ::after {
      content: '${style.label}';
      position: absolute;
      top: 12px;
      right: -4px;
      padding: 8px;
      
      font-weight: 700;
      font-size: 14px;
      color: white;
      background-color: ${style.color};
      border-radius: 2px;
    }
    
  `
}

const Wrapper = styled.article`
  ${getVariant}
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img``;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${({ sale }) => sale && css`
    color: ${COLORS.gray["700"]};
    text-decoration: line-through;
  `}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
