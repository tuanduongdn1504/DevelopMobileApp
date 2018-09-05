import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';
import { iconsMap } from '../../utils/appIcons';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: 'home',
      title: 'Tutor',
      icon: iconsMap['ios-home'],
      screen: 'home',
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      },
      // options: {
      //   ...navigatorStyle,
      //   topBar: {
      //     ...navigatorStyle.topBar,
      //     title: {
      //       text: I18n.t('appName'),
      //       color: Colors.default,
      //     },
      //   },
      //   backButton: {
      //     icon: iconsMap['md-arrow-back'],
      //     visible: true,
      //   },
      // },
    },
    {
      label: 'chat',
      title: 'Chat',
      icon: iconsMap['ios-chatbubbles'],
      screen: 'chatBox',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          title: {
            text: I18n.t('chatHistory'),
            color: Colors.default,
          },
        },
        backButton: {
          icon: iconsMap['md-arrow-back'],
          visible: true,
        },
      },
    },
    {
      label: 'safety',
      title: 'Safety',
      icon: iconsMap['ios-help-buoy'],
      screen: 'Safety',
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      },
    },
    // {
    //   label: 'notificationList',
    //   title: 'Notification',
    //   icon: iconsMap['ios-notifications'],
    //   screen: 'notificationList',
    //   options: {
    //     ...navigatorStyle,
    //     topBar: {
    //       ...navigatorStyle.topBar,
    //       title: {
    //         text: I18n.t('notification'),
    //         color: Colors.default,
    //       },
    //     },
    //     backButton: {
    //       icon: iconsMap['md-arrow-back'],
    //       visible: true,
    //     },
    //   },
    // },
    // {
    //   label: 'more',
    //   title: 'Chat',
    //   icon: iconsMap['ios-chatbubbles'],
    //   screen: 'detail',
    //   options: {
    //     topBar: {
    //       visible: false,
    //       drawBehind: true,
    //     },
    //   },
    // },

    {
      label: 'notifications',
      title: 'Notifications',
      icon: iconsMap['ios-notifications'],
      screen: 'notification',
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      },
    },
    {
      label: 'more',
      title: 'Menu',
      icon: iconsMap['md-menu'],
      screen: 'sideMenu',
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      },
    },
  ];

  const childrens = Tabs.map(data => ({
    stack: {
      children: [
        {
          component: {
            id: data.screen,
            name: data.screen,
            options: {
              ...data.options,
              bottomTabs: {
                backgroundColor: Colors.tabBackground,
                visible: true,
                animate: true,
                // currentTabIndex: 0,
                // currentTabId: 'currentTabId',
                // testID: 'bottomTabsTestID',
                drawBehind: false,
              },
            },
          },
        },
      ],
      options: {
        bottomTab: configTab(data),
        bottomTabs: {
          backgroundColor: Colors.tabBackground,
          visible: true,
          animate: true,
          // currentTabIndex: 0,
          // currentTabId: 'currentTabId',
          // testID: 'bottomTabsTestID',
          drawBehind: false,
        },
      },
    },
  }));

  Navigation.setRoot({
    root: {
      options: {
        topBar: {
          visible: true,
        },
        bottomTabs: {
          backgroundColor: Colors.tabBackground,
          visible: true,
          animate: true,
          // currentTabIndex: 0,
          // currentTabId: 'currentTabId',
          // testID: 'bottomTabsTestID',
          drawBehind: false,
        },
      },
      bottomTabs: {
        children: childrens,
        options: {
          bottomTabs: {
            backgroundColor: Colors.tabBackground,
            visible: true,
            animate: true,
            // currentTabIndex: 0,
            // currentTabId: 'currentTabId',
            // testID: 'bottomTabsTestID',
            drawBehind: false,
          },
        },
      },
    },
  });
};

const configTab = data => ({
  title: data.title,
  icon: data.icon,
  text: data.title,
  // badge: '2',
  // badgeColor: 'red',
  textColor: Colors.secondaryText,
  iconColor: Colors.secondaryText,
  selectedIconColor: Colors.tabSelected,
  selectedTextColor: Colors.tabSelected,
  fontSize: 10,
});
