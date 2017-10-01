// @flow
import React from 'react';
import InternshipGrid from 'components/internships/Grid';
import User from '@client/models/User';
import { shallow } from 'enzyme';

import { ShowUser } from './';

describe('ShowUser', ()=>{
  describe('renders', ()=>{
    const setup = ()=>{
      return shallow(<ShowUser
        user={new User()}
      />);
    };
    it('InternshipGrid', ()=>{
      const wrapper = setup();
      expect(wrapper.find(InternshipGrid).length).toBe(1);
    });
  });
});
