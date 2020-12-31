import React from 'react';
import Error404 from '@massds/mayflower-react/dist/Error404';
import Layout from '../components/layout';
import SEO from '../components/seo';
import './error.scss';

const FourOhFourPage = () => (
  <Layout>
    <SEO title="404" />
    <Error404 />
  </Layout>
);

export default FourOhFourPage;
