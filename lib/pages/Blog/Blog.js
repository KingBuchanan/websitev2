import React from "react";
import Layout from '../../components/Layout';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, ScrollView, StyleSheet, Image, Button } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Butter from 'buttercms';
const butter = Butter('<ef091b1352d5f92103aba6556c8d35678f29aa44>');
export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  async componentDidMount() {
    const {
      match
    } = this.props;
    let page = match && match.params.page || 1;
    const resp = await butter.post.list({
      page: page,
      page_size: 10
    });
    this.setState(resp.data);
    console.log(resp.data);
  }

  render() {
    const {
      user
    } = this.props;
    const {
      data
    } = this.state;

    const goToHome = () => {
      Actions.home();
    };

    const goToPost = post => {
      Actions.post({
        slug: post
      });
    };

    const goToCategories = () => {
      Actions.category();
    };

    if (data) {
      return /*#__PURE__*/React.createElement(Layout, {
        user: user
      }, /*#__PURE__*/React.createElement(ScrollView, {
        style: {
          padding: 20,
          backgroundColor: '#eeeeee'
        }
      }, data.map(post => /*#__PURE__*/React.createElement(TouchableOpacity, {
        style: styles.post,
        key: post.slug,
        onPress: () => goToPost(post.url)
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.heading
      }, post.title), /*#__PURE__*/React.createElement(Image, {
        style: styles.logo,
        source: {
          uri: post.featured_image
        }
      }), /*#__PURE__*/React.createElement(HTMLView, {
        value: post.summary
      }))), /*#__PURE__*/React.createElement(TouchableOpacity, {
        style: styles.button
      }, /*#__PURE__*/React.createElement(Button, {
        title: "Back to Home",
        onPress: goToHome
      }), /*#__PURE__*/React.createElement(Button, {
        title: "All categories",
        onPress: goToCategories
      }))));
    } else {
      return /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(Text, null, "Loading.."));
    }
  }

}
const styles = StyleSheet.create({
  post: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 20,
    margin: 20
  },
  vertical: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: '2em',
    fontFamily: 'Georgia',
    color: '#333333',
    paddingTop: '10px'
  },
  logo: {
    width: '90vw',
    height: '150px',
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  content: {
    height: '100px',
    width: '100%'
  }
});