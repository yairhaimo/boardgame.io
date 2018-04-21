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
  };

  constructor(props) {
    super(props);

    this._id = 0;
  }

  getContext = () => ({
    genID: () => ++this._id,
  });

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
