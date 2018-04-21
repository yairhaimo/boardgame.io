/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-dragtastic';
import './deck.css';

class Deck extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    className: PropTypes.string,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    splayWidth: PropTypes.number,
    dragZone: PropTypes.string,
  };

  static defaultProps = {
    splayWidth: 3,
    dragZone: 'bgio-card',
  };

  onClick = () => {
    if (this.props.onClick && React.Children.count(this.props.children) > 0) {
      this.props.onClick(React.Children.toArray(this.props.children)[0]);
    }
  };

  onDrop = args => {
    if (this.props.onDrop) {
      this.props.onDrop(args);
    }
  };

  render() {
    const { className, splayWidth, dragZone } = this.props;
    const classNames = ['bgio-deck'];
    if (className) classNames.push(className);

    if (React.Children.count(this.props.children) == 0) {
      classNames.push('empty');
    }

    return (
      <Droppable accepts={dragZone} onDrop={this.onDrop}>
        {({ isOver, willAccept, events }) => {
          let classes = [...classNames];

          if (isOver && willAccept) {
            classes.push('highlight');
          }

          return (
            <div
              className={classes.join(' ')}
              {...events}
              onClick={this.onClick}
            >
              {React.Children.map(this.props.children, (card, i) =>
                React.cloneElement(card, {
                  key: i,
                  isFaceUp: i === 0,
                  style: {
                    position: i ? 'absolute' : 'inherit',
                    left: i * splayWidth,
                    zIndex: -i,
                  },
                })
              )}
            </div>
          );
        }}
      </Droppable>
    );
  }
}

export { Deck };
