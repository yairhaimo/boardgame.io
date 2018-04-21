/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { UI } from './ui';
import { Card } from './card';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('is rendered', () => {
  {
    const card = Enzyme.shallow(
      <UI>
        <Card />
      </UI>
    );
    expect(card.html()).toContain('<div class="bgio-card');
  }

  {
    const card = Enzyme.shallow(
      <UI>
        <Card className="custom" />
      </UI>
    );
    expect(card.html()).toContain('custom');
  }
});

test('handlers', () => {
  const onClick = jest.fn();
  const card = Enzyme.mount(
    <UI>
      <Card onClick={onClick} />
    </UI>
  );

  card.simulate('click');

  expect(onClick).toHaveBeenCalled();
});
