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
        <Card id="1" back={1} />

        <Deck onDrop={() => console.log('drop')}>
          <Card id="2" back={2} />
          <Card id="3" back={3} />
        </Deck>
      </UI>
    );
  }
}

export default Board;
