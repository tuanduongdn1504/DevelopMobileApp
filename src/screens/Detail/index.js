import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../../themes';
import TutorInfo from './TutorInfo';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tutor } = this.props;
    return (
      <ScrollView style={styles.container}>
        <TutorInfo data={tutor} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
});

function mapStateToProps(state) {
  return {
    tutor: state.tutor.current,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
