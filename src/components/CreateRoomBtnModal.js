import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  Icon,
  Modal,
  FormControl,
  ControlLabel,
  Form,
  FormGroup,
  Schema,
  Alert,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModalState } from '../misc/custom-hooks';
import { database, auth } from '../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chat Name is Required'),
  des: StringType().isRequired('Description is Required'),
});

const INITIAL_FORM = {
  name: '',
  des: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setLoading(true);
    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };

    try {
      await database.ref('rooms').push(newRoomData);
      setLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      Alert.info(`${formValue.name} has been Created.`, 4000);
    } catch (err) {
      setLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-2">
      <Button block color="green" onClick={open}>
        <Icon icon="creeative" /> Create New Chat Room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter Chat room name.." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Room Description.</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows="5"
                name="des"
                placeholder="Enter description for Chat room."
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
