import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import vetReducer from './vet.reducer';
import maladyReducer from './malady.reducer';
import vetMatchReducer from './vetMatch.reducer';
import incompleteMatchReducer from './incompleteMatch.reducer';
import percentageReducer from './percentage.reducer'
import vetSearchReducer from './vetSearch.reducer';
import emailReducer from './email.reducer';
import details from './details.reducer';
import resourceDetails from './resourceDetails.reducer';
import resourceReducer from './resource.reducer';
import resourceSearch from './resourceSearch.reducer';
import demographicReducer from './demographic.reducer';
import addNewMatchReducer from './addNewMatch.reducer';
import categoryReducer from './category.reducer';
import dropdownReducer from './dropdown.reducer';
import compensationReducer from './compensationReducer.js';

const rootReducer = combineReducers({
  errors,
  user,
  demographicReducer,
  vetReducer,
  vetMatchReducer,
  incompleteMatchReducer,
  maladyReducer,
  percentageReducer,
  vetSearchReducer,
  resourceDetails,
  emailReducer,
  details,
  resourceReducer,
  resourceSearch,
  addNewMatchReducer,
  categoryReducer,
  dropdownReducer,
  compensationReducer,
});

export default rootReducer;
