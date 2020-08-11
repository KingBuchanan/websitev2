import React from 'react'
import butter from '../butter-client'
import Blog from '../Blog'
// import { Helmet } from 'react-helmet'
import Layout from '../../../components/Layout'

export default class BlogPost extends React.Component {
  state = {
    data: {}
  }
  async componentDidMount () {
    const { match } = this.props
    
    const resp = await butter.post.retrieve(match.params.post)
    this.setState(resp.data)
  }
  render () {
    const post = this.state.data
    const { user}=this.props;
    

    return (
    // <Layout user={user}>
      <div>

          <title>{post.seo_title}</title>
          <meta name='description' content={post.meta_description} />
          <meta name='og:image' content={post.featured_image} />
    
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
      // </Layout>
    )
  }
}