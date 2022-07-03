import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const MessageItem = ({ messages }) => {
  const { author, createdAt, text } = messages;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder">
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <spna className="ml-2">{author.name}</spna>
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

export default MessageItem;
