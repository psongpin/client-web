// @flow
import React, { PureComponent } from 'react';
import { UL, Row, Column, TextInput } from 'ui-kit';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import pageApplicationSelectors from '@client/selectors/pages/applications';
import { textInput } from './style.pcss';
import ApplicationListItem from '../ListItem';

export class ApplicationsIndex extends PureComponent {
  render() {
    const { props } = this;
    return (<div>
      <Row>
        <Column>
          <TextInput className={textInput} label="Search" />
        </Column>
      </Row>
      <Row>
        <Column>
          <UL>
            {
              ([1] || props.applicationIds).map((id)=>{
                return <ApplicationListItem id={id} key={id} />;
              })
            }
          </UL>
        </Column>
      </Row>
    </div>);
  }
}

const mapStateToProps = createStructuredSelector({
  applicationIds: pageApplicationSelectors.getRelatedIds('applications'),
});

export default flowRight([
  connect(mapStateToProps),
])(ApplicationsIndex);

