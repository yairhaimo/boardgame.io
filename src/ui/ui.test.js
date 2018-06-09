/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { UI } from './ui';
import { Card } from './card';
import { Deck } from './deck';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('basic', () => {
  let root;
  beforeEach(() => {
    root = Enzyme.shallow(
      <UI>
        <Deck>
          <Card />
        </Deck>
        <Card />
      </UI>
    );
  });

  test('is rendered', () => {
    expect(root.find(Deck).length).toBe(1);
    expect(root.find(Card).length).toBe(2);
  });
});
