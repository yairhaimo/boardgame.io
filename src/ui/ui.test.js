/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.resetModules();
});

const CreateWithContext = context => {
  jest.doMock('./ui-context', () => {
    return {
      Provider: props => props.children,
      Consumer: props => props.children(context),
    };
  });
  const UI = require('./ui').UI;
  const Card = require('./card').Card;
  const Deck = require('./deck').Deck;
  return { UI, Card, Deck };
};

describe('basic', () => {
  const { UI, Card, Deck } = CreateWithContext({});

  let root;
  beforeEach(() => {
    root = Enzyme.mount(
      <UI>
        <Deck id="1">
          <Card id="1" />
        </Deck>
        <Card id="2" />
      </UI>
    );
  });

  test('is rendered', () => {
    expect(root.find(Deck).length).toBe(1);
    expect(root.find(Card).length).toBe(2);
  });
});
