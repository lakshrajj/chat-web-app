import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import { useHover } from '../../../misc/custom-hooks';

const MessageItem = ({ messages, handleAdmin }) => {
  const { author, createdAt, text } = messages;

  const [selfRef, isHover] = useHover();

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHover ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin ? 'Remove Admin ' : 'Give Admin'}
            </Button>
          )}
        </ProfileInfoBtnModal>

        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>

      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
