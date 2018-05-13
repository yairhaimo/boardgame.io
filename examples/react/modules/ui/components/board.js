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
      <UI sandboxMode={true}>
        <Card />

        <Deck dragZone="other" onDrop={() => console.log('drop')}>
          <Card />
        </Deck>

        <Deck dragZone="other" onDrop={() => console.log('drop')}>
          <Card />
        </Deck>

        <Deck onDrop={() => console.log('drop')}>
          <Card />
          <Card />
          <Card />
        </Deck>

        <Card />
      </UI>
    );
  }
}

export default Board;
