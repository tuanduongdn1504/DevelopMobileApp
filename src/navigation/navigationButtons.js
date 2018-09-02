import I18n from 'react-native-i18n';
import { iconsMap } from '../utils/appIcons';
import { Colors } from '../themes';

export const menu = () => ({
  id: 'sideMenu',
  icon: iconsMap['md-menu'],
  disableIconTint: false,
  color: Colors.default,
});

export const search = () => ({
  id: 'search',
  icon: iconsMap.search,
  disabled: false,
  disableIconTint: false,
});

export const close = () => ({
  id: 'close',
  icon: iconsMap['md-close'],
  disabled: false,
  disableIconTint: true,
  color: Colors.default,
});

export const qrcode = () => ({
  id: 'qrcode',
  icon: iconsMap.qrcode,
  disabled: false,
  disableIconTint: true,
  color: Colors.default,
});

export const send = (disabled = true) => ({
  title: I18n.t('send'),
  id: 'send',
  disabled,
  buttonColor: Colors.primary,
  disableIconTint: true,
});

export const save = (disabled = true) => ({
  title: I18n.t('save'),
  id: 'save',
  disabled,
  buttonColor: Colors.primary,
  disableIconTint: true,
});

export const back = () => ({
  id: 'back',
  icon: iconsMap['md-arrow-back'],
  disabled: false,
  disableIconTint: false,
  color: Colors.default,
});

export const add = () => ({
  id: 'add',
  icon: iconsMap['md-add'],
  disableIconTint: false,
  color: Colors.default,
});
