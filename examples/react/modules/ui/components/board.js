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
        <Deck id="1" onDrop={() => console.log('drop')}>
          <Card id="1" back={1} />
        </Deck>

        <Deck id="2" onDrop={() => console.log('drop')} />

        <Deck id="3" onDrop={() => console.log('drop')}>
          <Card id="3" back={3} />
          <Card id="4" back={4} />
        </Deck>

        <Card id="5" back={5} />
      </UI>
    );
  }
}

export default Board;
