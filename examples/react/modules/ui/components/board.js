/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { UI, Card, Deck } from 'boardgame.io/ui';

function handler(type) {
  return arg => console.log(type + ': ' + JSON.stringify(arg));
}

class Board extends React.Component {
  render() {
    return (
      <UI sandboxMode={true}>
        <Deck
          id="1"
          onDrop={handler('deck1 onDrop')}
          onClick={handler('deck1 onClick')}
          onRemove={handler('deck1 onRemove')}
        >
          <Card id="1" back={1} onClick={handler('card1 onClick')} />
          <Card id="2" back={2} onClick={handler('card2 onClick')} />
          <Card id="3" back={3} onClick={handler('card3 onClick')} />
        </Deck>

        <Deck
          id="2"
          onDrop={handler('deck2 onDrop')}
          onClick={handler('deck2 onClick')}
          onRemove={handler('deck2 onRemove')}
        />

        <div>
          <Card id="4" back={4} onClick={handler('card4 onClick')} />
        </div>
      </UI>
    );
  }
}

export default Board;
