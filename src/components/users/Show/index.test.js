// @flow
import React from 'react';
import User from '@client/models/User';
import { shallow } from 'enzyme';

import InternshipsAndProjectsTabs from '../InternshipsAndProjectsTabs';
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
      expect(wrapper.find(InternshipsAndProjectsTabs).length).toBe(1);
    });
  });
});
