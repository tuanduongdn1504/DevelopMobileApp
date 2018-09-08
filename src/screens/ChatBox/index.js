import React, { Component } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Colors } from '../../themes/index';
import Button from '../../components/Button';
import EmojiBoard from '../../components/EmojiBoard';
import ChatItem from '../../components/Items/ChatItem';
import ChatActions from '../../redux/ChatRedux/actions';
import { getDataArr } from '../../redux/crudCreator/selectors';
import { addStore } from '../../redux/ChatRedux/firebaseStore';

class Chat extends Component {
  constructor(props) {
    super(props);
    const { user, receive } = this.props;
    const users = user.id > receive.id ? `${receive.id},${user.id}` : `${user.id},${receive.id}`;
    this.state = {
      historyChat: props.historyChat,
      inputText: '',
      heightInput: 0,
      isInit: true,
      users,
    };
    this.inputChat = React.createRef();
    this.scrollView = React.createRef();
    this.animatedInput = new Animated.Value(0);
    this.props.watchChat({ users });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isInit: false });
      this.scrollView.scrollToEnd({ animated: true });
    }, 300);
  }

  componentWillUnmount() {
    this.props.closeChat();
  }

  sendChat = () => {
    const { user, receive } = this.props;
    const chatData = {
      users: user.id > receive.id ? `${receive.id},${user.id}` : `${user.id},${receive.id}`,
      ...user,
      idUser: user.id,
      text: this.inputChat._lastNativeText,
      time: moment().toString(),
    };
    addStore(chatData);
    // const historyChat = [...this.state.historyChat];
    // historyChat.push({ idUser: 1, text: this.inputChat._lastNativeText, ...TEST_USER[0] });
    // this.setState({ historyChat });
    setTimeout(() => {
      this.scrollView.scrollToEnd({ animated: true });
    }, 200);
    Keyboard.dismiss();
    this.inputChat.clear();
  };

  openEmoji = () => {
    this.inputChat.blur();
    this.emojiPanel.toggleEmojiBoard();
  };

  handlePick = emoji => {
    this.inputChat._lastNativeText = this.inputChat._lastNativeText || '';
    this.inputChat._lastNativeText += emoji;
    this.inputChat.setNativeProps({ text: this.inputChat._lastNativeText });
  };

  renderInputGroup() {
    const { chats, user } = this.props;
    const { historyChat, isInit, heightInput } = this.state;
    const components = chats.map((data, index) => {
      return <ChatItem user={user} isInit={isInit} key={index} data={data} />;
    });
    return (
      <ScrollView
        ref={ref => {
          this.scrollView = ref;
        }}
        style={{ flex: 1 }}
      >
        {components}
        <View
          style={{
            height: heightInput,
          }}
        />
      </ScrollView>
    );
  }

  renderChatInput() {
    const { heightInput } = this.state;
    return (
      <View style={[styles.vButtonGroup, { marginBottom: heightInput }]}>
        <TextInput
          underlineColorAndroid="white"
          onBlur={() => {
            this.setState({ heightInput: 0 });
          }}
          onFocus={() => {
            this.setState({ heightInput: 60 });
            this.emojiPanel.hideEmojiBoard();
          }}
          ref={ref => {
            this.inputChat = ref;
          }}
          multiline
          placeholder="Type your message"
          placeholderTextColor={Colors.divider}
          style={styles.chatInput}
        />
        <Button
          ionicons="ios-send"
          iconSize={30}
          style={styles.btnSend}
          iconStyle={styles.iconBtnSend}
          onPress={this.sendChat}
        />
        <Button
          ionicons="ios-happy"
          iconSize={30}
          style={styles.btnSend}
          iconStyle={styles.iconBtnSend}
          onPress={this.openEmoji}
        />
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        behavior="position"
        style={styles.vChatBox}
      >
        {this.renderInputGroup()}
        {this.renderChatInput()}
        <EmojiBoard
          ref={ref => {
            this.emojiPanel = ref;
          }}
          onPick={this.handlePick}
        />
      </KeyboardAvoidingView>
    );
  }
}

global.defaultImage = [
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
  'https://images.pexels.com/photos/460237/pexels-photo-460237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const TEST_USER = [
  {
    userId: 0,
    thumbnail: global.defaultImage[0],
    name: 'Anh Doan',
  },
  {
    userId: 1,
    thumbnail: global.defaultImage[1],
    name: 'Long Nguyen',
  },
];

const TEST_DATA = [
  {
    id: 0,
    ...TEST_USER[0],
    text: 'Hello!',
  },
  {
    id: 1,
    ...TEST_USER[1],
    text: 'Hi! Where are you from?',
  },
  {
    id: 2,
    ...TEST_USER[0],
    text: 'Da Nang',
  },
];

Chat.propTypes = {
  historyChat: PropTypes.array,
};

Chat.defaultProps = {
  historyChat: TEST_DATA,
};

const styles = StyleSheet.create({
  vChatBox: {
    flexGrow: 1,
  },
  vButtonGroup: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderColor: Colors.divider,
  },
  btnSend: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.divider,
    backgroundColor: Colors.default,
  },
  iconBtnSend: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.gray,
    fontSize: 35,
  },
  chatInput: {
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    textAlign: 'left',
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
    chats: getDataArr(state, 'chat') || TEST_DATA,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    watchChat: data => dispatch(ChatActions.watchChat(data)),
    closeChat: data => dispatch(ChatActions.closeChat(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
