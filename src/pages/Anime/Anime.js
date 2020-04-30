import React from 'react';
import { SectionTitle, Paragraph } from '../../styles';
import Layout from '../../components/Layout';





const Anime =({user})=>{
return(
      <Layout user={user}>
    <div>
        <SectionTitle>Anime On My List</SectionTitle>   
    </div>
    
    </Layout>
);
};
export default Anime;