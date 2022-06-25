import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const Signin = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.info('Signed In !', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const onFBSignin = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignin = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome To Chat</h2>
                <p>Progressive Chat Platform.</p>
              </div>

              <div className="mt-3">
                <Button block color="blue" onClick={onFBSignin}>
                  <Icon icon="facebook" /> Continue With Facebook
                </Button>
                <Button block color="green" onClick={onGoogleSignin}>
                  <Icon icon="google" /> Continue With Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Signin;
