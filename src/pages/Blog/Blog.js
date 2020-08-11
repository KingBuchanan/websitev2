import React from 'react';
import Layout from '../../components/Layout';
import butter from './butter-client'
import { Link } from 'react-router-dom'



export default class Blog extends React.Component {
    state = {
        meta: {},
        data: []
      }

      async componentDidMount () {
        const { match } = this.props
        
        let page = 1
        const resp = await butter.post.list({ page: page, page_size: 10 })
        this.setState(resp.data)
      }

      render () {
        const { next_page, previous_page } = this.state.meta
        const { user} =this.props;
        console.log(user);
        return (
          <Layout user={user}>
            <h3 style={{margin:20}}>Blog Posts:</h3>
          <div className="Blog Posts">
            {this.state.data.map((post, key) => {
              return (
                <div key={key}>
                  <Link to={`/blog/posts/${post.slug}`}>{post.title}</Link>
                </div>
              )
            })}
    
            <br />
    
            <div>
              {previous_page && (
                <Link to={`/blog/${previous_page}`}>
                  <a>Prev</a>
                </Link>
              )}
    
              {next_page && (
                <Link to={`/blog/${next_page}`}>
                  <a>Next</a>
                </Link>
              )}
            </div>
          </div>
          </Layout>
        )
      }
    }

