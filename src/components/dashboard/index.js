import React from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import Editableinput from '../Editableinput';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = newData => {
    console.log(newData);
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>DashBoard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey , {profile.name}</h3>
        <Divider />
        <Editableinput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
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
