/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UIContext } from './ui';
import { Droppable } from 'react-dragtastic';
import './deck.css';

class DeckImpl extends React.Component {
  static propTypes = {
    context: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.any,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    splayWidth: PropTypes.number,
    dragZone: PropTypes.string,
    padding: PropTypes.number,
  };

  static defaultProps = {
    padding: 10,
    splayWidth: 3,
    dragZone: 'bgio-card',
  };

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  onDrop = cardProps => {
    this.props.context.drop(cardProps.id, this.props.id);

    if (this.props.onDrop) {
      this.props.onDrop(cardProps);
    }
  };

  render() {
    const { dragZone } = this.props;

    let cardIndex = 0;
    const cards = React.Children.map(this.props.children, card =>
      React.cloneElement(card, {
        onClick: this.onClick,
        dragZone: this.props.dragZone,
        inDeck: true,
        deckPosition: cardIndex++,
      })
    );

    return (
      <Droppable accepts={dragZone} onDrop={this.onDrop}>
        {({ events }) => {
          return (
            <div
              {...events}
              style={{
                background: '#eee',
                marginRight: 20,
                padding: this.props.padding,
                position: 'relative',
                width: '100px',
                height: '140px',
                display: 'block',
                float: 'left',
              }}
            >
              {cards}
            </div>
          );
        }}
      </Droppable>
    );
  }
}

const Deck = props => (
  <UIContext.Consumer>
    {context => <DeckImpl {...props} context={context} />}
  </UIContext.Consumer>
);

export { Deck };
