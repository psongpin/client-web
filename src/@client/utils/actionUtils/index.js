// @flow
import { List } from 'immutable';
import ErschemaActions, {
  PageActions as ErschemaPageActions,
  // $FlowFixMe
} from 'erschema-actions';
// $FlowFixMe
import * as relationshipActions from 'erschema-redux-immutable/actions/relationships';
import schema from '@client/schemas';
import pageSchema from '@client/schemas/pages';
import { batchActions } from 'redux-batched-actions';
import { retypeAction } from 'redux-retype-actions';
import { generateActionName } from 'resource-action-types';

type $relationship = {
  entityName: string,
  name: string,
  id: $$id,
};

export class Actions extends ErschemaActions {
  services: ?Object;
  constructor(name: string, services?: Object) {
    super(schema, name);
    this.services = services;
    this.relationships = {
      link: relationship => {
        return relationshipActions.link(name, relationship);
      },
    };
  }
  index = (ids: List<$$id>) => (dispatch: $$dispatch) => {
    if (ids && ids.size) {
      // $FlowFixMe
      return this.services.post('index', { ids }).then(entities => {
        dispatch(this.entities.index(entities));
        return entities;
      });
    }
    return Promise.resolve([]);
  };
  get = (id: $$id) => (dispatch: $$dispatch) => {
    // $FlowFixMe
    return this.services.get(id).then(entity => {
      dispatch(this.entities.get(entity));
      return entity;
    });
  };
  del = (id: $$id) => (dispatch: $$dispatch) => {
    // $FlowFixMe
    return this.services.del(id).then(() => {
      return dispatch(this.entities.remove(id));
    });
  };
  create = (payload?: Object = {}) => (dispatch: $$dispatch) => {
    // $FlowFixMe
    return this.services.create(payload).then(id => {
      dispatch(this.entities.create({ ...payload, id }));
      return id;
    });
  };
  update = (id: $$id, payload?: Object = {}) => (dispatch: $$dispatch) => {
    // $FlowFixMe
    return this.services.update(id, payload).then(() => {
      return dispatch(this.entities.update({ ...payload, id }));
    });
  };
  createRelated = (entity: { id: $$id }, relationship: $relationship) =>
    retypeAction(
      `CREATE_RELATED_${generateActionName(this.name)}_${generateActionName(
        relationship.entityName
      )}`,
      batchActions([
        this.entities.create(entity),
        relationshipActions.link(relationship.entityName, {
          relationshipName: relationship.name,
          id: relationship.id,
          relationshipValue: entity.id,
        }),
      ])
    );
  paginate = (id: $$id, relationshipName: string, entities: Array<Object>) =>
    retypeAction(
      `PAGINATE_${generateActionName(this.name)}_${generateActionName(
        relationshipName
      )}`,
      this.entities.concatRelated(id, relationshipName, entities)
    );
  createRelatedPage = (
    entity: { id: $$id },
    page: string,
    relationshipName: string
  ) =>
    this.createRelated(entity, {
      entityName: 'pages',
      name: relationshipName,
      id: page,
    });
}

export class PageActions extends ErschemaPageActions {
  constructor(name: string) {
    super(schema, pageSchema, name);
  }
  update = (payload: Object = {}) => (dispatch: $$dispatch) => {
    return dispatch(this.entities.update(payload));
  };
}
