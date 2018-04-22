/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Logo from './logo';
import { UIContext } from './ui';
import { Draggable, DragComponent } from 'react-dragtastic';
import './card.css';

class CardImpl extends React.Component {
  static propTypes = {
    isFaceUp: PropTypes.bool,
    front: PropTypes.node,
    back: PropTypes.node,
    className: PropTypes.string,
    dragZone: PropTypes.string,
    dragData: PropTypes.any,
    style: PropTypes.any,
    onClick: PropTypes.func,
    context: PropTypes.any.isRequired,
  };

  static defaultProps = {
    onClick: () => {},
    isFaceUp: false,
    dragZone: 'bgio-card',
    front: <div className="bgio-card__front">Card</div>,
    back: (
      <div className="bgio-card__back">
        <Logo width="48" />
      </div>
    ),
  };

  constructor(props) {
    super(props);
    this.domRef = React.createRef();
  }

  state = {};

  onClick = () => {
    this.props.onClick();
  };

  onDragEnd = () => {
    if (this.props.context.sandboxMode) {
      const t = this.domRef.current;
      this.setState({
        x: t.offsetLeft,
        y: t.offsetTop,
      });
    }
  };

  componentWillMount() {
    this._id = this.props.context.genID();
  }

  render() {
    const {
      back,
      className,
      style,
      front,
      isFaceUp,
      dragZone,
      dragData,
    } = this.props;

    const classNames = ['bgio-card'];
    if (className) classNames.push(className);

    let cardStyle = {};
    if (
      this.props.context.sandboxMode &&
      this.state.x !== undefined &&
      this.state.y !== undefined
    ) {
      cardStyle = {
        position: 'fixed',
        zIndex: 10,
        left: this.state.x,
        top: this.state.y,
      };
    }

    return (
      <div onClick={this.onClick}>
        <Draggable
          id={this._id}
          type={dragZone}
          onDragEnd={this.onDragEnd}
          data={dragData}
        >
          {({ isActive, events }) => (
            <div
              className={classNames.join(' ')}
              style={{ ...style, ...cardStyle, opacity: isActive ? 0 : 1 }}
              {...events}
            >
              {isFaceUp ? front : back}
            </div>
          )}
        </Draggable>

        <DragComponent for={this._id}>
          {({ x, y, isOverAccepted, currentlyHoveredDroppableId }) => {
            const classes = [...classNames];
            let content = back;

            if (isFaceUp) {
              content = front;
            }

            if (currentlyHoveredDroppableId !== null) {
              if (isOverAccepted) {
                classes.push('accept');
                content = null;
              } else {
                classes.push('reject');
                content = null;
              }
            }

            return (
              <div
                className={classes.join(' ')}
                ref={this.domRef}
                style={{
                  cursor: 'pointer',
                  borderWidth: 2,
                  pointerEvents: 'none',
                  position: 'fixed',
                  zIndex: 10,
                  left: x - 50,
                  top: y - 70,
                }}
              >
                {content}
              </div>
            );
          }}
        </DragComponent>
      </div>
    );
  }
}

const Card = props => (
  <UIContext.Consumer>
    {context => <CardImpl {...props} context={context} />}
  </UIContext.Consumer>
);

export { Card };
