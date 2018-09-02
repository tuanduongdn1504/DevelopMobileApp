import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, View, Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import UserInfo from './UserInfo';
import SettingItem from './SettingItem';
import { shareApp, openURL } from '../../utils/tools';
import Button from '../../components/Button';
import { size, fontWeight } from '../../themes/Fonts';
import LoginActions from '../../redux/LoginRedux/actions';
import { startWelcome } from '../../navigation/navigationActions';

class Setting extends Component {
  static navigatorStyle = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  editProfile = () => {};

  share = () => {};

  rate = () => {};

  goTerms = () => {};

  goAbout = () => {};

  logout = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <UserInfo user={user} onPress={this.editProfile} />
        <ScrollView>
          <SettingItem onPress={this.share} title={I18n.t('moreText.shareToFriend')} />
          <SettingItem onPress={this.rate} title={I18n.t('moreText.rateForUs')} />
          <SettingItem onPress={this.goTerms} title={I18n.t('moreText.termsAndService')} />
          <SettingItem noBottomBorder onPress={this.goAbout} title={I18n.t('moreText.aboutUs')} />
        </ScrollView>
        <Button
          center={false}
          onPress={this.logout}
          transparent
          ionicons="md-log-out"
          iconSize={30}
          buttonTitle={I18n.t('moreText.logout')}
          style={styles.btnLogout}
          textStyle={styles.txtLogout}
        />
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.default,
    flex: 1,
  },
  btnLogout: {
    marginLeft: 20,
  },
  txtLogout: {
    color: Colors.primary,
    fontSize: size.h5,
    fontWeight: fontWeight.bold,
  },
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: data => dispatch(LoginActions.signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
