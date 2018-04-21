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

class Card extends React.Component {
  static propTypes = {
    isFaceUp: PropTypes.bool,
    front: PropTypes.node,
    back: PropTypes.node,
    className: PropTypes.string,
    dragZone: PropTypes.string,
    style: PropTypes.any,
    onClick: PropTypes.func,
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

  onClick = () => {
    this.props.onClick();
  };

  renderCard(context) {
    const { back, className, style, front, isFaceUp, dragZone } = this.props;

    const classNames = ['bgio-card'];
    if (className) classNames.push(className);

    const id = context.genID();

    return (
      <div onClick={this.onClick}>
        <Draggable id={id} type={dragZone} data={{ card: this }}>
          {({ isActive, events }) => (
            <div
              className={classNames.join(' ')}
              style={{ ...style, opacity: isActive ? 0 : 1 }}
              {...events}
            >
              {isFaceUp ? front : back}
            </div>
          )}
        </Draggable>

        <DragComponent for={id}>
          {({ x, y, isOverAccepted }) => (
            <div
              className={classNames.join(' ')}
              style={{
                cursor: 'pointer',
                borderWidth: 2,
                borderColor: isOverAccepted ? '#afa' : '#aaa',
                pointerEvents: 'none',
                position: 'fixed',
                zIndex: 10,
                left: x - 50,
                top: y - 70,
              }}
            >
              {isFaceUp ? front : back}
            </div>
          )}
        </DragComponent>
      </div>
    );
  }

  render() {
    return (
      <UIContext.Consumer>
        {context => this.renderCard(context)}
      </UIContext.Consumer>
    );
  }
}

export { Card };
