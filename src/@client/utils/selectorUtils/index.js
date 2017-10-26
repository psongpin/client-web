// @flow
import { OrderedSet } from 'immutable';
// $FlowFixMe
import ErschemaSelector from 'erschema-selectors';
import { createSelector } from 'reselect';

export default class Selector extends ErschemaSelector {
  constructor(name: string, model: *) {
    super('erschema', name, model);
  }
}

export class PageSelector<X> {
  name: string;
  model: X;
  constructor(name: string, model: X) {
    this.name = name;
    this.model = model;
  }
  find = (): any => {
    return (state: $$state) =>
      state.erschema.entities.pages.getIn([this.name]) || this.model;
  };
  getRelatedIds = (relationshipName: string): any => {
    return createSelector(
      [
        state => {
          if (!state.erschema.relationships.pages[relationshipName]) {
            throw new Error(
              `Missing relationship ${relationshipName} in pages schema ${this
                .name}`
            );
          }
          return state.erschema.relationships.pages[relationshipName].get(
            this.name
          );
        },
      ],
      (relatedIds: OrderedSet<$$id>) =>
        (relatedIds || new OrderedSet()).toList()
    );
  };
  findRelatedId = (relationshipName: string): any => {
    return state =>
      state.erschema.relationships.pages[relationshipName].get(this.name);
  };
}
