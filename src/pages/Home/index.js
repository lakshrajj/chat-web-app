import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/rooms.context';
import { useMediaQuery } from '../../misc/custom-hooks';
import Chat from './Chat';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const { isExact } = useRouteMatch();

  const canRenderSidebar = isDesktop || isExact;

  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col className="h-100" xs={24} md={8}>
              <Sidebar />
            </Col>
          )}

          <Switch>
            <Route exact path="/chat/:chatId">
              <Col className="h-100" xs={24} md={8}>
                <Chat />
              </Col>
            </Route>

            <Route>
              {isDesktop && (
                <Col className="h-100" xs={24} md={8}>
                  <h6 className="text-center mt-page">
                    Please Select Chat Room !
                  </h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
