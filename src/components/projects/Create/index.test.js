// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { Clickable } from 'ui-kit';
import { CreateProject } from './';


describe('CreateProject', ()=>{
  it('renders', ()=>{
    const wrapper = shallow(<CreateProject />);
    expect(wrapper.find(Clickable).length).toBe(1);
  })
})