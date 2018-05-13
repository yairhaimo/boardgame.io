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
    id: PropTypes.string.isRequired,
    isFaceUp: PropTypes.bool,
    front: PropTypes.node,
    back: PropTypes.node,
    className: PropTypes.string,
    dragZone: PropTypes.string,
    style: PropTypes.any,
    onClick: PropTypes.func,
    context: PropTypes.any.isRequired,
    leavePlaceholder: PropTypes.bool,
    deckEject: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
    isFaceUp: false,
    dragZone: 'bgio-card',
    leavePlaceholder: true,
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

  onClick = () => {
    this.props.onClick();
  };

  onDragStart = () => {
    this.props.context.undrop(this.props.id);
  };

  onDragEnd = () => {
    if (this.props.context.dropped[this.props.id]) {
      return;
    }

    if (this.props.context.sandboxMode) {
      const t = this.domRef.current;

      this.props.context.setPosition(this.props.id, {
        x: t.offsetLeft,
        y: t.offsetTop,
      });

      if (this.props.deckEject) {
        this.props.deckEject(this.props);
      }
    }
  };

  render() {
    const { back, className, style, front, isFaceUp, dragZone } = this.props;

    const classNames = ['bgio-card'];
    if (className) classNames.push(className);

    let placeholder = null;

    let cardStyle = {};
    if (
      (this.props.context.sandboxMode &&
        this.props.context.positions[this.props.id] !== undefined) ||
      this.props.context.dropped[this.props.id]
    ) {
      const position = this.props.context.positions[this.props.id];

      if (position) {
        cardStyle = {
          position: 'fixed',
          zIndex: position.zIndex || 5,
          left: position.x,
          top: position.y,
        };
      }

      // In case we override the position of the card,
      // we keep an invisible placeholder card in the original
      // location to avoid messing up the layout.
      if (this.props.leavePlaceholder) {
        placeholder = (
          <div
            className={classNames.join(' ')}
            style={{
              ...style,
              opacity: 0,
              zIndex: -100,
              cursor: 'default',
            }}
          >
            {isFaceUp ? front : back}
          </div>
        );
      }
    }

    let draggable = (
      <Draggable
        id={this.props.id}
        type={dragZone}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        data={{ ...this.props }}
      >
        {({ isActive, events }) => {
          return (
            <div
              className={classNames.join(' ')}
              style={{
                ...style,
                ...cardStyle,
                opacity: isActive ? 0 : 1,
                pointerEvents: isActive ? 'none' : 'all',
              }}
              {...events}
            >
              {isFaceUp ? front : back}
            </div>
          );
        }}
      </Draggable>
    );

    let dragComponent = (
      <DragComponent for={this.props.id}>
        {({ x, y, isOverAccepted, currentlyHoveredDroppableId }) => {
          const classes = [...classNames];
          let content = back;

          if (isFaceUp) {
            content = front;
          }

          if (currentlyHoveredDroppableId !== null) {
            if (isOverAccepted) {
              classes.push('accept');
            } else {
              classes.push('reject');
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
                zIndex: 2000000000,
                left: x - 50,
                top: y - 70,
              }}
            >
              {content}
            </div>
          );
        }}
      </DragComponent>
    );

    return (
      <div onClick={this.onClick}>
        {placeholder}
        {draggable}
        {dragComponent}
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
