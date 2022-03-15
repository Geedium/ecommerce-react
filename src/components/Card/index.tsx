import * as React from "react";

import { Paper, Box } from "@mui/material";

import styles from "./Card.module.css";

type Props = {};

type State = {
  offsetY: number;
  offsetX: number;
  unstar: boolean;
};

import { Transition } from "react-transition-group";

export default class Card extends React.Component<Props, State> {
  myRef: React.RefObject<any>;

  public readonly state: State = {
    offsetY: 0,
    offsetX: 0,
    unstar: false,
  };

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  handleMouseMove = (e: any) => {
    const cardItem = this.myRef.current;
    if (e.target === cardItem) {
      const force = 4.5;
      const offsetY =
        -(e.nativeEvent.offsetY - cardItem.offsetHeight / 2) / force;
      const offsetX =
        (e.nativeEvent.offsetX - cardItem.offsetWidth / 2) / force;
      // console.log(offsetY, offsetX, this.state);

      this.setState({
        offsetY,
        offsetX,
        unstar: true,
      });
    }

    // cardItem.style.transform =
    //   "rotateX(" + offsetY + "deg) rotateY(" + offsetX + "deg)";
  };

  handleMouseClick = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.setState({
      offsetY: 0,
      offsetX: 0,
    });
  };

  handleMouseLeave = (e: any) => {
    this.setState({
      offsetY: 0,
      offsetX: 0,
      unstar: false,
    });
  };

  render(): JSX.Element {
    const transitionStyles = {
      entering: styles.entering,
      entered: styles.entered,
      exiting: styles.exiting,
      exited: styles.exited,
    };

    return (
      <Box
        className="card-interact"
        onMouseMove={this.handleMouseMove}
        onClick={this.handleMouseClick}
        onMouseLeave={this.handleMouseLeave}
        sx={{
          height: 400,
          width: 400,
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        <Transition in={this.state.unstar} timeout={300}>
          {(state) => (
            <Paper
              square={true}
              sx={{
                transform: `rotateX(${this.state.offsetY}deg) rotateY(${this.state.offsetX}deg)`,
              }}
              ref={this.myRef}
              className={`${styles.cardItem} ${transitionStyles[state]}`}
            >
              <img
                style={{
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                src="https://source.unsplash.com/random"
              />
            </Paper>
          )}
        </Transition>
      </Box>
    );
  }
}
