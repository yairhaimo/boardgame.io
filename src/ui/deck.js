/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UIContext } from './ui';
import { Droppable } from 'react-dragtastic';
import './deck.css';

class DeckImpl extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    splayWidth: PropTypes.number,
    context: PropTypes.any.isRequired,
    dragZone: PropTypes.string,
  };

  static defaultProps = {
    splayWidth: 3,
    dragZone: 'bgio-card',
  };

  constructor(props) {
    super(props);
    this.domRef = React.createRef();
    this.childrenIDs = [];
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  getPosition() {
    let t = this.domRef.current;
    let x = t.offsetLeft;
    let y = t.offsetTop;

    while (t.offsetParent) {
      t = t.offsetParent;
      x += t.offsetLeft;
      y += t.offsetTop;
    }

    return { x, y };
  }

  onDrop = args => {
    this.props.context.drop(args.id, this.getPosition());

    if (this.props.onDrop) {
      this.props.onDrop(args);
    }
  };

  registerID = id => {
    this.childrenIDs.push(id);
  };

  componentDidMount() {
    const position = this.getPosition();
    this.childrenIDs.map(id => this.props.context.setPosition(id, position));
  }

  render() {
    const { dragZone } = this.props;

    return (
      <Droppable accepts={dragZone} onDrop={this.onDrop}>
        {({ events }) => {
          const children = React.Children.map(this.props.children, (card, i) =>
            React.cloneElement(card, {
              onClick: this.onClick,
              key: i,
              dragZone: this.props.dragZone,
              leavePlaceholder: false,
              registerID: this.registerID,
            })
          );

          return (
            <div
              {...events}
              ref={this.domRef}
              style={{
                width: '100px',
                height: '140px',
                display: 'inline-flex',
              }}
            >
              {children}
            </div>
          );
        }}
      </Droppable>
    );
  }
}

const Deck = props => (
  <UIContext.Consumer>
    {context => <DeckImpl {...props} context={context} />}
  </UIContext.Consumer>
);

export { Deck };
