// @flow
import React, { PureComponent } from 'react';
import { List } from 'immutable';
import TextInput from '../';
import UL from '../../UL';
import ULItem from '../../UL/Item';
import ULHeader from '../../UL/Header';
import { Icon } from '../../Icon';

type $props = {
  title?: string,
  search?: string,
  createLabel?: string,
  entities: List<Object>,
  onUpdate: Function,
  onRemove: Function,
  onCreate: Function,
  Comp?: any,
  valueProp?: string,
}

export default class TextInputList extends PureComponent {
  props: $props;
  state = {
    createKey: Math.random(),
  }
  handleCreate = (value: *) => {
    return this.props.onCreate(value)
    .then(this.createSuccessful);
  }
  createSuccessful = ()=>{
    this.setState({
      createKey: Math.random(),
    });
  }
  handleUpdate = (id: $$id)=>{
    return (content: string)=>this.props.onUpdate(id, content);
  }
  render() {
    const Comp = this.props.Comp || TextInput;
    return (<UL>
      {
        this.props.title && <ULHeader caption={this.props.title} />
      }
      {
        this.props.entities.map(entity => {
          return (<ULItem
            rightActions={[
              <Icon name="trash" onClick={()=>this.props.onRemove(entity.id)} />,
            ]}
          >
            {
              // $FlowFixMe
              <Comp value={entity[this.props.valueProp || 'content']} onChange={this.handleUpdate(entity.id)} />
            }
          </ULItem>);
        })
      }
      <ULItem>
        {
          // $FlowFixMe
          <Comp key={this.state.createKey} label={this.props.createLabel} onEnter={this.handleCreate} />
        }
      </ULItem>
    </UL>);
  }
}
