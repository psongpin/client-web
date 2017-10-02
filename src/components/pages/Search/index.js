// @flow
import React, { PureComponent } from 'react';
import { TextInput, Tabs, Tab } from 'ui-kit';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import searchSelectors from '@client/selectors/pages/search';
import InternshipsGrid from 'components/internships/Grid';
import ProjectsGrid from 'components/projects/Grid';
import UsersGrid from 'components/users/Grid';

import { textInput } from './style.pcss';

export class Search extends PureComponent {
  render() {
    const { props } = this;
    return (<div>
      <TextInput className={textInput} label="Search" />
      <Tabs>
        <Tab label="INTERNSHIPS"><InternshipsGrid ids={[1] || props.internshipIds} /></Tab>
        <Tab label="PROJECTS"><ProjectsGrid ids={props.projectIds} /></Tab>
        <Tab label="PEOPLE"><UsersGrid ids={props.userIds} /></Tab>
      </Tabs>
    </div>);
  }
}

export const mapStateToProps = createStructuredSelector({
  userIds: searchSelectors.getRelatedIds('users'),
  internshipIds: searchSelectors.getRelatedIds('internships'),
  projectIds: searchSelectors.getRelatedIds('projects'),
});

export default connect(mapStateToProps)(Search);
