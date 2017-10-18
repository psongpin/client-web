// @flow
import { getMirror } from '@client/utils/generalUtils';

const locations = {
  prelogin: null,
  login: null,
  signup: null,
  presignup: null,
  mySections: null,
  myStarredSections: null,
  publicationSettings: null,
  perspectivesIndex: null,
  perspectivesCreate: null,
  perspectivesShow: null,
  caveatsIndex: null,
  caveatsCreate: null,
  caveatsShow: null,
  search: null,
  referenceIndex: null,
  prerequisiteIndex: null,
  offersCreate: null,
  offersAccept: null,
};

module.exports = getMirror(locations);
