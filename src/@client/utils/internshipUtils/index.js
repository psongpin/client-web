// @flow
import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import projectActions from '../../actions/projects';
import internshipActions from '../../actions/internships';
import internshipSelectors from '../../selectors/internships';
import projectSelectors from '../../selectors/projects';

export function requestInternshipAndProject(getInternshipId: $$selector<$$id>) {
  const getProjectId = internshipSelectors.findRelatedId('project');
  const mapStateToProps = createStructuredSelector({
    internshipId: getInternshipId,
    projectId: getProjectId,
    internship: internshipSelectors.find(getInternshipId),
    project: projectSelectors.find(getProjectId),
  });
  const mapDispatchToProps = (dispatch: $$dispatch)=>{
    return {
      getInternship(id) {
        if (id) {
          dispatch(internshipActions.get(id));
        }
      },
      getProject(id) {
        if (id) {
          dispatch(projectActions.get(id));
        }
      },
    };
  };
  const onInternshipIdChange = (props) => {
    props.getInternship(props.internshipId);
  };
  const onProjectIdChange = (props) => {
    props.getProject(props.projectId);
  };
  return flowRight([
    connect(mapStateToProps, mapDispatchToProps),
    khange([
      [kheck('internshipId'), onInternshipIdChange],
      [kheck('projectId'), onProjectIdChange],
    ]),
  ]);
}
