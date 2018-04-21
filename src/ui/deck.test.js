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

test('basic', () => {
  const cards = [<Card key={0} />, <Card key={1} />];

  {
    const deck = Enzyme.shallow(
      <UI>
        <Deck>{cards}</Deck>
      </UI>
    );
    expect(deck.html()).toContain('svg');
  }

  {
    const deck = Enzyme.shallow(<Deck className="custom" />);
    expect(deck.html()).toContain('custom');
  }
});

test('splayWidth', () => {
  const cards = [
    <Card key={0} />,
    <Card key={1} />,
    <Card key={2} />,
    <Card key={3} />,
  ];
  const splayWidth = 10;
  const deck = Enzyme.shallow(
    <UI>
      <Deck splayWidth={splayWidth}>{cards}</Deck>
    </UI>
  );

  deck.find('.bgio-card').forEach((node, index) => {
    expect(node.props().style.left).toEqual(splayWidth * index);
  });
});
