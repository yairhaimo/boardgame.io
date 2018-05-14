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
    positions: {},
  };

  constructor(props) {
    super(props);

    this._nextID = 0;
    this._zIndex = 5;
    this.freeCards = {};
    this.dropped = {};

    React.Children.forEach(props.children, child => {
      if (child.type == Card) {
        this.freeCards[child.props.id] = child.props;
      }
    });
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
    this.dropped[id] = true;
    this.freeCards[id] = null;
    this.forceUpdate();
  };

  undrop = id => {
    this.dropped[id] = false;
    this.forceUpdate();
  };

  createCard = cardProps => {
    this.freeCards[cardProps.id] = cardProps;
    this.forceUpdate();
  };

  getContext = () => ({
    genID: () => ++this._nextID,
    sandboxMode: this.props.sandboxMode,
    setPosition: this.setPosition,
    drop: this.drop,
    undrop: this.undrop,
    positions: this.state.positions,
    dropped: this.dropped,
    createCard: this.createCard,
  });

  componentWillMount() {
    this._nextID = 0;
  }

  render() {
    let freeCards = [];
    for (const id in this.freeCards) {
      const cardProps = this.freeCards[id];
      if (cardProps) {
        freeCards.push(<Card id={id} {...cardProps} key={id} />);
      }
    }

    const children = React.Children.map(this.props.children, child => {
      if (child.type != Card) return child;
    });

    return (
      <UIContext.Provider value={this.getContext()}>
        <div className="bgio-ui">
          {children}
          {freeCards}
        </div>
      </UIContext.Provider>
    );
  }
}

export { UI, UIContext };
