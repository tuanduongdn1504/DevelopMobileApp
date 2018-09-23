import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Animated } from 'react-native';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { showModal } from '../../navigation/navigationActions';
import { close } from '../../navigation/navigationButtons';
import SearchInput from '../../components/SearchInput';
import { Colors } from '../../themes';
import Button from '../../components/Button';

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animatedSearch = new Animated.Value(0);
  }

  blurSearch = () => {
    this.setState({ isShowSearch: false }, () => {
      Animated.timing(this.animatedSearch, {
        toValue: 0,
        duration: 400
      }).start();
    });
    Navigation.dismissOverlay('searchResults');
  };

  focusSearch = () => {
    this.setState({ isShowSearch: true }, () => {
      Animated.timing(this.animatedSearch, {
        toValue: 1,
        duration: 400
      }).start();
    });
    Navigation.showOverlay({
      component: {
        id: 'searchResults',
        name: 'searchResults',
        passProps: {},
        options: {
          overlay: {
            interceptTouchOutside: false,
          },
        },
      },
    });
  };

  showFilter = () => {
    showModal('filter', {
      title: I18n.t('filter.text'),
      leftButtons: [],
      rightButtons: [close()],
    });
  };

  render = () => {
    const scale = this.animatedSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const left = this.animatedSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 0],
    });
    const searchBackground = this.animatedSearch.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    });
    const { isShowSearch } = this.state;
    return (
      <Animated.View
        style={[
          styles.iconSearch,
          {
            backgroundColor: searchBackground,
          },
        ]}
      >
        <Animated.View style={[styles.iconFilter, { transform: [{ scale }] }]}>
          <Button
            isShadow
            ionicons="ios-options"
            endColor={Colors.default}
            startColor={Colors.default}
            onPress={this.showFilter}
            iconColor={Colors.primaryText}
            iconStyle={{ marginRight: 0 }}
            style={styles.btnFilter}
          />
        </Animated.View>
        <Animated.View style={[styles.searchContent, { left }]}>
          <SearchInput
            isShadow={!isShowSearch}
            isFocus={isShowSearch}
            onClose={this.blurSearch}
            onFocus={this.focusSearch}
            onChange={this.onChangeSearch}
            style={styles.search}
            unFocusBackground={Colors.default}
          />
        </Animated.View>
      </Animated.View>
    );
  };
}

FilterBar.propTypes = {};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: Platform.OS === 'ios' ? 48 : 23,
    // marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFilter: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconFilter: {
    width: 50,
    height: 50,
    marginLeft: 20,
  },
  iconSearch: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    right: 0,
    left: 0,
    paddingTop: 30,
  },
  searchContent: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 30,
  },
});

export default FilterBar;
