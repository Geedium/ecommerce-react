import React from "react";

import createScrollSnap from "scroll-snap";

import styles from "./SnapContainer.module.css";

export default class SnapContainer extends React.Component {
  container = React.createRef();

  constructor(props) {
    super(props);
  }

  bindScrollSnap() {
    const element = this.container.current;
    const { bind, unbind } = createScrollSnap(
      element,
      {
        snapDestinationX: "0%",
        snapDestinationY: "90%",
        timeout: 100,
        duration: 300,
        threshold: 0.2,
        snapStop: true,
      },
      () => {}
    );
  }

  componentDidMount() {
    this.bindScrollSnap();
  }

  render() {
    return (
      <div ref={this.container} className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}
