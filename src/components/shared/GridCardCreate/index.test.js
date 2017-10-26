// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { Clickable } from 'ui-kit';
import CreateGridCard from './';

describe('CreateGridCard', () => {
  it('renders', () => {
    const wrapper = shallow(<CreateGridCard />);
    expect(wrapper.find(Clickable).length).toBe(1);
  });
});
