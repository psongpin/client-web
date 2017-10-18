// @flow
import { openPanel, closePanel } from '@client/actions/router';

const {
  prelogin,
  login,
  presignup,
  signup,
  publicationSettings,
  mySections,
  myStarredSections,
  perspectivesIndex,
  perspectivesCreate,
  perspectivesShow,
  caveatsIndex,
  caveatsCreate,
  caveatsShow,
  search,
  referenceIndex,
  prerequisiteIndex,
  offersCreate,
  offersAccept,
} = require('./locations');

export const openOffersCreate = (applicationId: $$id)=>{
  return openPanel(offersCreate, { applicationId });
};

export const openOffersAccept = (applicationId: $$id)=>{
  return openPanel(offersAccept, { applicationId });
};

export const openPrelogin = openPanel(prelogin);
export const openLogin = openPanel(login);

export const openPresignup = openPanel(presignup);
export const openSignup = openPanel(signup);

export const openMySections = openPanel(mySections);

export const openMyStarredSections = openPanel(myStarredSections);

export const openPublicationSettings = (sectionId: $$id) =>
  openPanel(publicationSettings, { sectionId });

export const openPerspectivesIndex = openPanel(perspectivesIndex);

export const openPerspectivesCreate = (sectionId: $$id) =>
  openPanel(perspectivesCreate, { sectionId });

export const openPerspectivesShow = (perspectiveId: $$id) =>
  openPanel(perspectivesShow, { perspectiveId });

export const openCaveatsIndex = openPanel(caveatsIndex);

export const openPrerequisiteIndex = openPanel(prerequisiteIndex);

export const openReferenceIndex = openPanel(referenceIndex);

export const openCaveatsCreate = (sectionId: $$id) =>
  openPanel(caveatsCreate, { sectionId });

export const openCaveatsShow = (caveatId: $$id) =>
  openPanel(caveatsShow, { caveatId });


export const openSearch = (searchText: string) => openPanel(search, {
  searchText,
});

export {
  closePanel,
};
