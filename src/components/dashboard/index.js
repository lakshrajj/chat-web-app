import React from 'react';
import { Button, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>DashBoard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey , {profile.name}</h3>
      </Drawer.Body>

      <Drawer.Footer>
        <Button onClick={onSignOut} block color="red">
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
