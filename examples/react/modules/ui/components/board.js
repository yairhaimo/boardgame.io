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
        <Deck
          id="1"
          onDrop={card => console.log('drop: ' + JSON.stringify(card))}
          onClick={topCard => console.log('top: ' + JSON.stringify(topCard))}
        >
          <Card id="1" back={1} onClick={() => console.log('click card 1')} />
          <Card id="2" back={2} onClick={() => console.log('click card 2')} />
          <Card id="3" back={3} onClick={() => console.log('click card 3')} />
        </Deck>

        <Deck
          id="2"
          onDrop={card => console.log('drop: ' + JSON.stringify(card))}
          onClick={topCard => console.log('top: ' + JSON.stringify(topCard))}
        />

        <div>
          <Card id="4" back={4} onClick={() => console.log('click card 4')} />
        </div>
      </UI>
    );
  }
}

export default Board;
