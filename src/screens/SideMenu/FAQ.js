import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Accordion from '../../components/Accordion';
import Text from '../../components/Text';
import FaqItem from '../../components/Items/FaqItem';
import FaqActions from '../../redux/FaqsRedux/actions';
import { getDataArr } from '../../redux/crudCreator/selectors';

// const SECTIONS = [
//   {
//     title: 'First',
//     content: 'Lorem ipsum...',
//   },
//   {
//     title: 'Second',
//     content: 'Lorem ipsum...',
//   },
// ];

class FAQ extends Component {
  static propTypes = {
    getAllFaqs: PropTypes.func,
    faqs: PropTypes.array,
  };

  componentDidMount() {
    const { getAllFaqs } = this.props;
    getAllFaqs({ type: 'tutor' });
  }

  renderHeader(section, _, isActive) {
    return <FaqItem title={section.question} collapsed={!isActive} />;
  }

  renderContent(section) {
    return (
      <View style={styles.content}>
        <Text type="body2">{section.answer}</Text>
      </View>
    );
  }

  render() {
    const { faqs } = this.props;
    console.log('FAQ DATA', faqs);
    return (
      <View style={styles.container}>
        <Accordion
          sections={faqs}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});

function mapStateToProps(state) {
  return {
    faqs: getDataArr(state, 'faqs'),
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(FaqActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FAQ);
