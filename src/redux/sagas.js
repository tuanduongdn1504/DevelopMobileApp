import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import chatSagas from './ChatRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';
import subjectsSagas from './SubjectsRedux/sagas';
import faqsSagas from './FaqsRedux/sagas';
import tutorsSagas from './TutorsRedux/sagas';

export default function* root() {
  yield all([
    ...tutorsSagas,
    ...faqsSagas,
    ...subjectsSagas,
    ...ForgotPasswordSagas,
    ...chatSagas,
    ...appSagas,
    ...loginSagas,
  ]);
}
