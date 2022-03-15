import styled from "@emotion/styled";

import { FC } from "react";

interface IProps {
  color: string;
}

const StyledCardLabel = styled.div<IProps>`
  background-color: ${(props) => props.color};
  text-transform: uppercase;
  position: absolute;
  user-select: none;
  left: -10px;
  top: 10px;
  z-index: 99;
  width: 60px;
  padding: 0.25rem;
  font-size: 0.8rem;
`;

const CardLabel: FC = ({ children }) => {
  return <StyledCardLabel color="#4aa904">{children}</StyledCardLabel>;
};

export default CardLabel;
