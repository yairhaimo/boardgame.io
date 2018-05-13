/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';

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
  };

  setPosition = (id, position) => {
    if (!this.props.sandboxMode) {
      return;
    }

    this.setState(s => ({
      ...s,
      positions: { ...s.positions, [id]: position },
    }));
  };

  getContext = () => ({
    genID: () => ++this._id,
    sandboxMode: this.props.sandboxMode,
    setPosition: this.setPosition,
    positions: this.state.positions,
  });

  componentWillMount() {
    this._id = 0;
  }

  render() {
    const children = React.Children.map(this.props.children, elem =>
      React.cloneElement(elem, {})
    );

    return (
      <UIContext.Provider value={this.getContext()}>
        <div className="bgio-ui">{children}</div>
      </UIContext.Provider>
    );
  }
}

export { UI, UIContext };
