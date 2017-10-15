// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Col as ColumnFB } from 'react-flexbox-grid';
import { createStructuredSelector } from 'reselect';
import { isPanelActive } from '@client/selectors/panel';

type $props = {
  size?: number;
  children?: any;
  className?: string;
  activePanel: boolean;
}
const sizeNames = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
  xl: 1,
};

export class Column extends PureComponent {
  props: $props;
  getFinalSize = (size?: number)=>{
    if (size && size !== 12) {
      return this.props.activePanel ? size * 2 : size;
    }
    return size;
  }
  render() {
    const { size = 12, children, ...props } = this.props;
    const sizes = Object.keys(sizeNames).reduce((finalResult, sizeName) => {
      finalResult[sizeName] = this.getFinalSize(props[sizeName] || size);
      return finalResult;
    }, {});
    return (<ColumnFB
      {...sizes}
      {...props}
    >
      {
        children
      }
    </ColumnFB>);
  }
}

const mapStateToProps = createStructuredSelector({
  activePanel: isPanelActive,
});

export default connect(mapStateToProps)(Column);
