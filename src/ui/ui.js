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

const UIContext = React.createContext();

class UI extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    sandboxMode: PropTypes.bool,
  };

  static defaultProps = {
    sandboxMode: false,
  };

  state = {
    // Positions of all the UI elements.
    // Used in sandbox mode.
    positions: {},

    dropped: {},

    ejectedCards: {},
  };

  constructor(props) {
    super(props);

    this._nextID = 0;
    this._zIndex = 5;
  }

  setPosition = (id, position) => {
    if (!this.props.sandboxMode) {
      return;
    }

    this.setState(s => ({
      positions: {
        ...s.positions,
        [id]: { ...position, zIndex: this._zIndex++ },
      },
    }));
  };

  drop = id => {
    this.setState(s => ({ dropped: { ...s.dropped, [id]: true } }));
  };

  undrop = id => {
    this.setState(s => ({ dropped: { ...s.dropped, [id]: false } }));
  };

  createCard = cardProps => {
    this.setState(s => ({
      ejectedCards: [
        ...s.ejectedCards,
        <Card {...cardProps} key={cardProps.id} />,
      ],
    }));
  };

  getContext = () => ({
    genID: () => ++this._nextID,
    sandboxMode: this.props.sandboxMode,
    setPosition: this.setPosition,
    drop: this.drop,
    undrop: this.undrop,
    positions: this.state.positions,
    dropped: this.state.dropped,
    createCard: this.createCard,
  });

  componentWillMount() {
    this._nextID = 0;
  }

  render() {
    let ejectedCards = [];
    for (const id in this.state.ejectedCards) {
      const card = this.state.ejectedCards[id];
      ejectedCards.push(card);
    }

    return (
      <UIContext.Provider value={this.getContext()}>
        <div className="bgio-ui">
          {this.props.children}
          {ejectedCards}
        </div>
      </UIContext.Provider>
    );
  }
}

export { UI, UIContext };
