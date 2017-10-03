// @flow
// $FlowFixMe
import ErschemaActions, { PageActions as ErschemaPageActions } from 'erschema-redux-immutable/Actions';
// $FlowFixMe
import { relationshipActions } from 'erschema-redux-immutable/actions-handlers';
import schema from '@client/schemas';
import pageSchema from '@client/schemas/pages';
import { batchActions } from 'redux-batched-actions';
import { retypeAction } from 'redux-retype-actions';
import { generateActionName } from 'resource-action-types';

type $relationship = {
  entityName: string,
  name: string,
  id: $$id,
}

export class Actions extends ErschemaActions {
  services: Object;
  constructor(name: string, services?: Object) {
    super(schema, name);
    this.services = services;
  }
  get = (id: $$id)=>dispatch=>{
    return this.services.get(id).then((entity)=>{
      return dispatch(this.entities.get(entity));
    });
  }
  createRelated = (entity: {id: $$id}, relationship: $relationship) => retypeAction(
    `CREATE_RELATED_${generateActionName(this.name)}_${generateActionName(relationship.entityName)}`,
    batchActions([
      this.entities.create(entity),
      relationshipActions.link(
        relationship.entityName,
        {
          relationshipName: relationship.name,
          id: relationship.id,
          relationshipValue: entity.id,
        },
      ),
    ]),
  );
  paginate = (id: $$id, relationshipName: string, entities: Array<Object>) => retypeAction(
    `PAGINATE_${generateActionName(this.name)}_${generateActionName(relationshipName)}`,
    this.entities.concatRelated(id, relationshipName, entities),
  );
  createRelatedPage = (
    entity: {id: $$id},
    page: string,
    relationshipName: string,
  ) => this.createRelated(
    entity,
    {
      entityName: 'pages',
      name: relationshipName,
      id: page,
    },
  );
}

export class PageActions extends ErschemaPageActions {
  constructor(name: string) {
    super(schema, pageSchema, name);
  }
}
