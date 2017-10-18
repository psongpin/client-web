// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/interns';
import { statusTypes } from '@client/models/Intern';

class InternActions extends Actions {
  logMinutes = (id: $$id, oldMinutes: number, minutes: number) => dispatch => {
    return services.logMinutes(id, minutes)
    .then(()=>{
      const totalMinutes = Number(oldMinutes) + Number(minutes);
      if (totalMinutes > 2400) {
        return dispatch(
          this.entities.update({ id, minutes: totalMinutes, status: statusTypes.AWAITING_APPROVAL })
        );
      }
      return dispatch(this.entities.update({ id, minutes: totalMinutes }));
    });
  }
  changeStatus = (id: $$id, status: number) => dispatch => {
    return services.changeStatus(id, status).then(()=>{
      return dispatch(this.entities.update({ id, status }));
    });
  }
}

export default new InternActions(schemaConstants.interns, services);
