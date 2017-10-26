// @flow
import { get } from 'lodash';
import React, { PureComponent } from 'react';

type $check = (props: Object, nextProps: Object) => boolean;
type $onChange = (props: Object) => any;

export function khange(
  checks: Array<[$check, $onChange]> | $check,
  onChanges?: $onChange
) {
  return (WrappedComponent: Object) =>
    class KhangeWrapper extends PureComponent {
      componentWillMount() {
        if (Array.isArray(checks)) {
          checks.forEach(([check, onChange]) => {
            if (check(this.props, {})) {
              onChange(this.props);
            }
          });
        } else if (checks(this.props, {})) {
          if (onChanges) onChanges(this.props);
        }
      }
      componentWillReceiveProps(nextProps: Object) {
        if (Array.isArray(checks)) {
          checks.forEach(([check, onChange]) => {
            if (check(this.props, nextProps)) {
              onChange(nextProps);
            }
          });
        } else if (checks(this.props, nextProps)) {
          if (onChanges) onChanges(nextProps);
        }
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
}

export function kheck(...propPaths: string[]) {
  return (props: Object, nextProps: Object) =>
    propPaths.reduce((finalResult, propPath) => {
      if (!finalResult) {
        if (get(props, propPath) !== get(nextProps, propPath)) {
          return true;
        }
      }
      return finalResult;
    }, false);
}
