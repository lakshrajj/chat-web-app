import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Button, Drawer, Alert } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import Editableinput from '../../Editableinput';

const EditRoomBtnDrawer = () => {
  const { open, close, isOpen } = useModalState();
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const name = useCurrentRoom(v => v.name);
  const des = useCurrentRoom(v => v.des);

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success('Successfully updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };
  const onDesSave = newData => {
    updateData('des', newData);
  };

  return (
    <div>
      <Button
        full={isMobile}
        className="br-circle"
        size="sm"
        color="red"
        onClick={open}
      >
        A
      </Button>

      <Drawer show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Editableinput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name cannot be Empty"
          />
          <Editableinput
            componentClass="textarea"
            rows={5}
            onSave={onDesSave}
            initialValue={des}
            emptyMsg="Description cannot be Empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
