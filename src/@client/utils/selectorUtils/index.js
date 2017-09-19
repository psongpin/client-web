// @flow
import { OrderedSet, List } from 'immutable';
// $FlowFixMe
import ErschemaSelector from 'erschema-selectors';
import { createSelector } from 'reselect';

export default class Selector extends ErschemaSelector {
  constructor(name: string, model: *) {
    super('erschema', name, model);
  }
}

export class PageSelector <X> {
  name: string;
  model: X;
  constructor(name: string, model: X) {
    this.name = name;
    this.model = model;
  }
  findEntity = (): any => {
    return (state: $$state) => (state.erschema.entities.pages.getIn(['data', this.name]) || this.model);
  }
  getRelatedEntityIds = (relationshipName: string): $$selector<List<$$id>> => {
    return createSelector(
      [
        (state) => {
          if (!state.erschema.relationships.pages[relationshipName]) {
            throw new Error(`Missing relationship ${relationshipName} in pages schema ${this.name}`);
          }
          return state.erschema.relationships.pages[relationshipName].get(this.name);
        },
      ],
      (relatedEntityIds: OrderedSet<$$id>) => (relatedEntityIds || new OrderedSet()).toList(),
    );
  }
  findRelatedEntityId = (relationshipName: string): $$selector<$$id> => {
    return state => state.erschema.relationships.pages[relationshipName].get(this.name);
  }
}
