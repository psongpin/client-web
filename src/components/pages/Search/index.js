// @flow
import React, { PureComponent } from 'react';
import { TextInput, Tabs, Tab } from 'ui-kit';
import InternshipsGrid from 'components/internships/Grid';
import ProjectsGrid from 'components/projects/Grid';
import UsersGrid from 'components/users/Grid';
import { textInput } from './style.pcss';

export class Search extends PureComponent {
  render() {
    return (<div>
      <TextInput className={textInput} label="Search" />
      <Tabs>
        <Tab label="INTERNSHIPS"><InternshipsGrid ids={[1, 2, 3, 4]} /></Tab>
        <Tab label="PROJECTS"><ProjectsGrid ids={[1, 2, 3, 4]} /></Tab>
        <Tab label="PEOPLE"><UsersGrid ids={[1, 2, 3, 4]} /></Tab>
      </Tabs>
    </div>);
  }
}

export default Search;
