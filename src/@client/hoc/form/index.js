// @flow
/* eslint-disable */
import React, { PureComponent } from 'react';
import { Map, List, Record } from 'immutable';
import titleCaseUtil from 'title-case';
import { bindMethods } from '@client/utils/classUtils';
import { validate } from '@client/utils/formUtils';
import { get } from 'lodash';

type $fieldProperties = {
  label: string,
  placeholder: string,
  name: string,
  errors: List<string>,
  value: *,
  initialValue: *,
  isDirty: boolean,
  isValid: boolean,
  verify: List<any>,
};

const genFieldFromString = function genFieldFromString(
  key
): $Exact<$fieldProperties> {
  const titleCase = titleCaseUtil(key);
  return {
    name: key,
    label: titleCase,
    placeholder: titleCase,
    errors: new List(),
    isValid: false,
    value: null,
    initialValue: null,
    isDirty: false,
    verify: new List(),
  };
};

function genFieldConfig(fields, key, initialValue) {
  const field = fields[key];
  if (typeof field !== 'object') {
    return genFieldFromString(key);
  }
  if (initialValue === undefined) {
    return { ...genFieldFromString(key), ...field };
  }
  return {
    ...genFieldFromString(key),
    ...field,
    isValid: !!initialValue,
    value: initialValue,
  };
}

export class Field extends Record({
  name: '',
  label: '',
  placeholder: '',
  errors: new List(),
  isValid: true,
  value: null,
  initialValue: null,
  isDirty: false,
  verify: new List(),
  onChange: () => ({}),
  onKeyPress: () => ({}),
  interact: false,
}) {
  name: string;
  label: string;
  placeholder: string;
  errors: List<string>;
  isValid: boolean;
  value: any;
  initialValue: any;
  isDirty: boolean;
  verify: List<string>;
  onChange: Function;
}

const defaultConfig = {};

export type $fields = Map<string, Field>;

type $selector<$props, $results> = (props: $props) => $results;

export function form<
  $props: *,
  $fieldsConfig: *,
  $actionsConfig: *,
  $config: *
>(
  fieldsSelector: $selector<$props, $fieldsConfig>,
  actionsSelector: $selector<$props, $actionsConfig>,
  // $FlowFixMe
  configSelector?: $selector<$props, $config> = () => defaultConfig
) {
  return (WrappedComponent: *) =>
    class Form extends PureComponent {
      state: {
        fields: $fields,
        isValid: boolean,
      };
      actions: {
        submit: { onClick: () => Promise<*> },
        cancel: { onClick: () => void },
      };
      entities: Object;
      tokensByKey: Object;
      lastKey: string;
      startTime: number;
      props: $props;
      constructor(props: $props) {
        super(props);
        this.tokensByKey = {};
        bindMethods(
          this,
          'validityCheck',
          'getField',
          'submit',
          'jsonifyFields',
          'handleErrors',
          'onChange'
        );
        this.state = this.getInitialState(props);
      }
      componentWillReceiveProps(nextProps: $props) {
        const nextConfig = configSelector(nextProps);
        const config = configSelector(this.props);
        if (
          get(nextProps, nextConfig.reset || '') !==
          get(this.props, nextConfig.reset || '')
        ) {
          this.reset(nextProps);
        }
        const { initialValues: nextInitialValues } = nextConfig;
        const { initialValues } = config;
        const initialPropName = nextConfig.initialValuesPropName;
        if (nextInitialValues !== initialValues) {
          this.reinitialize(nextProps);
        } else if (
          initialPropName &&
          nextProps[initialPropName] !== this.props[initialPropName]
        ) {
          this.reinitialize(nextProps);
        }
      }
      onEnter = (event: Object) => {
        if (this.state.isValid && event.key === 'Enter') this.submit();
      };
      getInitialState = (props: $props) => {
        const fields = fieldsSelector(props);
        const config = configSelector(props);
        const { initialValues = {}, interact = false } = config;

        const fieldsMap = Object.keys(fields).reduce((allFields, key) => {
          const fieldConfig = genFieldConfig(
            fields,
            key,
            initialValues[key] ||
              get(props, `${config.initialValuesPropName || ''}.${key}`)
          );
          return allFields.set(
            key,
            new Field({
              ...fieldConfig,
              onChange: this.onChange,
              onKeyPress: this.onEnter,
              interact:
                fieldConfig.interact && interact
                  ? {
                      ...interact,
                      entity: `${interact.context}_${key.toUpperCase()}`,
                    }
                  : false,
            })
          );
        }, new Map());
        const initialState = {
          isValid: this.isValid(fieldsMap),
          fields: fieldsMap,
          ...config,
        };
        this.entities = {
          submit: {
            disabled: !initialState.isValid,
            onClick: this.submit,
            children: 'Submit',
            styleType: 'primary',
            interact: interact
              ? { ...interact, entity: `${interact.context}_SUBMIT` }
              : false,
          },
          cancel: {
            onClick: this.cancel,
            children: 'Cancel',
            styleType: 'default',
            interact: interact
              ? { ...interact, entity: `${interact.context}_CANCEL}` }
              : false,
          },
        };
        return initialState;
      };
      reset = (props: $props) => {
        this.setState(() => {
          return this.getInitialState(props);
        });
      };
      reinitialize = (props: $props) => {
        const config = configSelector(props);
        const { initialValues = {} } = config;
        this.setState(prevState => {
          const fields = prevState.fields.map(field => {
            const { name, isDirty } = field;
            const value =
              initialValues[name] ||
              get(props, `${config.initialValuesPropName || ''}.${name}`);
            if (isDirty) {
              return field;
            }
            return field.merge({
              value,
              initialValue: value,
            });
          });
          const isValid = this.isValid(fields);
          if (isValid !== prevState.isValid) {
            this.newSubmitAction(isValid);
          }
          return { fields, isValid };
        });
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            fields={this.state.fields}
            actions={this.entities}
            isValid={this.state.isValid}
          />
        );
      }
      getField(fieldName: string) {
        return this.state.fields.get(fieldName);
      }
      isValid = (fields: Map<string, Field>) =>
        fields.toKeyedSeq().reduce((valid, nextField) => {
          if (valid) {
            return nextField.get('isValid');
          }
          return valid;
        }, true);
      newSubmitAction = (isValid: boolean) => {
        this.entities.submit = { ...this.entities.submit, disabled: !isValid };
      };
      validityCheck(field: Field): { fields: $fields } {
        const errors = field
          .get('verify')
          .reduce((finalResult, verification) => {
            if (typeof verification === 'string') {
              return validate(verification, field, finalResult);
            }
            return verification(field, finalResult);
          }, new List());
        const fields = this.state.fields.set(
          field.name,
          field.merge({
            errors,
            isValid: errors.size === 0,
          })
        );
        const isValid = this.isValid(fields);
        if (isValid !== this.state.isValid) {
          this.newSubmitAction(isValid);
        }
        return {
          fields,
          isValid,
        };
      }
      onChange({ name, value }: { name: string, value: * }) {
        const token = Math.random();
        this.startTime = new Date().getTime();
        this.lastKey = name;
        this.tokensByKey[name] = token;
        const config = configSelector(this.props);
        const actions = actionsSelector(this.props);
        const fieldConfig = fieldsSelector(this.props)[name];
        const { update } = actions;
        const updateCallback = fieldConfig.onChange || update;

        this.setState(previousState => {
          const field = previousState.fields.get(name);
          const newField = field.merge({
            isDirty: true,
            value,
          });
          if (updateCallback) {
            setTimeout(() => {
              const currentTime =
                new Date().getTime() - (config.debounce || 500);
              if (
                this.startTime <= currentTime ||
                (this.lastKey !== name && this.tokensByKey[name] === token)
              ) {
                updateCallback(newField, this.jsonifyFields()).catch(
                  this.handleErrors
                );
              }
            }, 500);
          }
          return this.validityCheck(newField);
        });
      }

      submit() {
        const actions = actionsSelector(this.props);
        const { submit } = actions;
        return submit(this.jsonifyFields()).catch(this.handleErrors);
      }

      cancel = () => {
        const actions = actionsSelector(this.props);
        const { cancel } = actions;
        return cancel();
      };
      handleErrors(errors: Object) {
        const nextFields = Object.keys(errors).reduce(
          (fields, key) =>
            fields
              .updateIn([key, 'errors'], errorsList => {
                if (errorsList) {
                  return errorsList.concat(errors[key]);
                }
                return new List();
              })
              .setIn([key, 'isValid'], false),
          this.state.fields
        );

        this.setState({
          fields: nextFields,
        });
      }
      jsonifyFields() {
        const jsonFields = this.state.fields.toJS();
        return Object.keys(jsonFields).reduce((jsonifiedFields, key) => {
          jsonifiedFields[key] = jsonFields[key].value;
          return jsonifiedFields;
        }, {});
      }
    };
}
/* eslint-enable */
