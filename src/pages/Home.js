import React from 'react';
import { Col, Grid } from 'rsuite';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <Grid fluid className="h-100">
      <Col xs={24} md={8}>
        <Sidebar />
      </Col>
    </Grid>
  );
};

export default Home;
