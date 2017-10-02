// @flow
import React from 'react';
import { shallow } from 'enzyme';
import InternshipGrid from 'components/internships/Grid';

import { Search } from './';


describe('Components/Search', ()=>{
  const setup = ()=>{
    return shallow(<Search />);
  };
  it('InternshipGrid', ()=>{
    const wrapper = setup();
    expect(wrapper.find(InternshipGrid).length).toBe(1);
  });
});
