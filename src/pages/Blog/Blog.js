import React from "react";
import Layout from '../../components/Layout';
import Butter from 'buttercms'

const butter = Butter('<ef091b1352d5f92103aba6556c8d35678f29aa44>')

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {user}=this.props;
    return (
        <Layout user={user}>
        
      </Layout>
    );
    
  }

  getPosts(){
    butter.post.list({page:1, page_size: 10});
  }

  
}