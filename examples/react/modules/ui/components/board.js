/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { UI, Card, Deck } from 'boardgame.io/ui';

class Board extends React.Component {
  render() {
    return (
      <UI sandboxMode={false}>
        <Card />

        <Deck onDrop={() => console.log('drop')}>
          <Card />
          <Card />
          <Card />
        </Deck>

        <Deck dragZone="other" onDrop={() => console.log('drop')}>
          <Card />
          <Card />
        </Deck>
      </UI>
    );
  }
}

export default Board;
