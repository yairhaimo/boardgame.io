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
import { Deck } from './deck';

const UIContext = React.createContext();

class UI extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    sandboxMode: PropTypes.bool,
  };

  static defaultProps = {
    sandboxMode: false,
  };

  constructor(props) {
    super(props);

    this._nextID = 0;
    this._zIndex = 5;
    this.cards = {};
    this.decks = {};
    this.originalCards = new Set();

    React.Children.forEach(props.children, child => {
      if (child.type == Card) {
        this.cards[child.props.id] = {
          props: child.props,
          position: null,
          deckID: null,
        };
        this.originalCards.add(child.props.id);
      } else {
        const deckID = child.props.id;
        let cardIDs = [];

        React.Children.forEach(child.props.children, card => {
          cardIDs.push(card.props.id);
          this.cards[card.props.id] = {
            props: card.props,
            position: null,
            deckID,
          };
        });

        this.decks[child.props.id] = {
          props: child.props,
          cards: cardIDs,
        };
      }
    });
  }

  setPosition = (cardID, position) => {
    if (!this.props.sandboxMode) {
      return;
    }

    this.cards[cardID].position = { ...position, zIndex: this._zIndex++ };
    this.forceUpdate();
  };

  drop = (cardID, deckID) => {
    if (!this.props.sandboxMode) {
      return;
    }

    const card = this.cards[cardID];

    // Remove card from any deck it was a part of.
    if (card.deckID) {
      const deck = this.decks[card.deckID];
      deck.cards = deck.cards.filter(item => item != cardID);
    }

    card.deckID = deckID;

    // Add card to new deck (if any).
    if (deckID) {
      const deck = this.decks[card.deckID];
      deck.cards.push(cardID);
    }

    this.forceUpdate();
  };

  getContext = () => ({
    genID: () => ++this._nextID,
    sandboxMode: this.props.sandboxMode,
    setPosition: this.setPosition,
    drop: this.drop,
  });

  componentWillMount() {
    this._nextID = 0;
  }

  render() {
    let freeCards = [];
    let placeholders = [];
    for (const id in this.cards) {
      const card = this.cards[id];
      if (!card.deckID) {
        freeCards.push(
          <Card id={id} key={id} position={card.position} {...card.props} />
        );
      }

      if (this.originalCards.has(id) && (card.position || card.deckID)) {
        placeholders.push(<div className="bgio-card placeholder" key={id} />);
      }
    }

    let decks = [];
    for (const id in this.decks) {
      const deck = this.decks[id];

      let cards = [];
      for (let i = 0; i < deck.cards.length; i++) {
        const cardID = deck.cards[i];
        const card = this.cards[cardID];
        cards.push(<Card id={cardID} key={'deck:' + cardID} {...card.props} />);
      }

      decks.push(
        <Deck id={id} key={id} {...deck.props}>
          {cards}
        </Deck>
      );
    }

    return (
      <UIContext.Provider value={this.getContext()}>
        <div className="bgio-ui">
          {placeholders}
          {freeCards}
          {decks}
        </div>
      </UIContext.Provider>
    );
  }
}

export { UI, UIContext };
