/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './card';
import { UIContext } from './ui';
import { Droppable } from 'react-dragtastic';
import './deck.css';

class DeckImpl extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    splayWidth: PropTypes.number,
    context: PropTypes.any.isRequired,
    dragZone: PropTypes.string,
    padding: PropTypes.number,
  };

  static defaultProps = {
    padding: 10,
    splayWidth: 3,
    dragZone: 'bgio-card',
  };

  constructor(props) {
    super(props);
    this.domRef = React.createRef();
    this.cards = {};

    React.Children.forEach(
      props.children,
      child => (this.cards[child.props.id] = child)
    );
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  getPosition() {
    let t = this.domRef.current;
    let x = t.offsetLeft + this.props.padding;
    let y = t.offsetTop + this.props.padding;

    while (t.offsetParent) {
      t = t.offsetParent;
      x += t.offsetLeft;
      y += t.offsetTop;
    }

    return { x, y };
  }

  onDrop = cardProps => {
    const position = this.getPosition();
    this.props.context.drop(cardProps.id);
    this.props.context.setPosition(cardProps.id, position);

    this.cards[cardProps.id] = <Card {...cardProps} key={cardProps.id} />;
    this.forceUpdate();

    if (this.props.onDrop) {
      this.props.onDrop(cardProps.id);
    }
  };

  deckEject = cardProps => {
    if (cardProps.id in this.cards) {
      this.props.context.createCard(cardProps);
      delete this.cards[cardProps.id];
      this.forceUpdate();
    }
  };

  componentDidMount() {
    const position = this.getPosition();
    for (const id in this.cards) {
      this.props.context.setPosition(id, position);
    }
  }

  render() {
    const { dragZone } = this.props;

    const cards = [];

    for (const id in this.cards) {
      const card = this.cards[id];
      cards.push(
        React.cloneElement(card, {
          onClick: this.onClick,
          key: id,
          dragZone: this.props.dragZone,
          deckEject: this.deckEject,
          leavePlaceholder: false,
        })
      );
    }

    return (
      <Droppable accepts={dragZone} onDrop={this.onDrop}>
        {({ events }) => {
          return (
            <div
              {...events}
              ref={this.domRef}
              style={{
                background: '#eee',
                marginRight: 20,
                padding: this.props.padding,
                width: '100px',
                height: '140px',
                display: 'inline-flex',
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
