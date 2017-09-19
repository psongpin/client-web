// @flow
import React, { PureComponent } from 'react';
import { List } from 'immutable';
import Navigation from '../Navigation';
import Link from '../Link';
import Button from '../Button';
import { Header } from '../Header';

type $props = {
  entities: List<any>,
  title?: string,
  linkFunc?: Function,
  labelFunc?: Function,
  clickFunc?: Function,
}

export default class DisplayList extends PureComponent {
  props: $props;
  render() {
    const { clickFunc, linkFunc = (entity) => entity.content, labelFunc = (entity)=>entity.content } = this.props;
    return (<div>
      {
        this.props.title && <Header size="sm">{this.props.title}</Header>
      }
      <Navigation>
        {
          this.props.entities.toJS().map(entity => {
            return clickFunc ? (
              <Button onClick={clickFunc(entity)}>{labelFunc(entity)}</Button>
            ) : (
              <Link href={linkFunc(entity)} label={labelFunc(entity)} icon="link" />
            );
          })
        }
      </Navigation>
    </div>);
  }
}
