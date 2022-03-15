import styled from "@emotion/styled";

interface IProps {
  height: number;
}

export const ImageMagnify = styled.div<IProps>`
  height: ${(props) => props.height};
  position: relative;
  img {
    transition: transform 0.5s ease;
  }
  &:hover img {
    transform: scale(1.5);
  }
`;

export default ImageMagnify;
