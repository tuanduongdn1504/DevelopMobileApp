import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ProgressScreen from '../components/ProgressScreen';

import Intro from '../screens/User/Intro';
import Signup from '../screens/User/Signup';
import Home from '../screens/Home';
import SideMenu from '../screens/SideMenu';
import About from '../screens/SideMenu/About';
import Detail from '../screens/Detail';
import InAppNotification from '../screens/Popup/Notification';
import ChatList from '../screens/ChatList';
import ChatBox from '../screens/ChatBox';
import Safety from '../screens/Safety';
import Notification from '../screens/Notification';
import SignupStudent from '../screens/User/SignupStudent';
import SignupTutor from '../screens/User/SignupTutor';
import SignIn from '../screens/User/SignIn';
import Filter from '../screens/Filter';
import SearchResults from '../screens/Filter/SearchResults';
import ForgotPassword from '../screens/User/ForgotPassword';
import ResetPassword from '../screens/User/ResetPassword';

export function registerScreens(store, persistor) {
  const PersistProvider = props => {
    const { children } = props;
    return (
      <Provider {...props}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  };
  Navigation.registerComponent(
    'progressScreen',
    () => ProgressScreen,
    PersistProvider,
    store,
  );
  Navigation.registerComponent(
    'inAppNotification',
    () => Notification,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'intro',
    () => Intro,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'signUp',
    () => Signup,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'signUpStudent',
    () => SignupStudent,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'signUpTutor',
    () => SignupTutor,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'home',
    () => Home,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'sideMenu',
    () => SideMenu,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'about',
    () => About,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'detail',
    () => Detail,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'chatBox',
    () => ChatBox,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'Safety',
    () => Safety,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'notification',
    () => Notification,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'chatList',
    () => ChatList,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'filter',
    () => Filter,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'searchResults',
    () => SearchResults,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'forgotPassword',
    () => ForgotPassword,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'resetPassword',
    () => ResetPassword,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'signIn',
    () => SignIn,
    PersistProvider,
    store,
  );
}
