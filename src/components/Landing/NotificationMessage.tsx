import React, { useState, useEffect } from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';
import { Authorization } from '../Types/GeneralTypes';
import HowDoesItWork from './HowDoesItWork';
import JsonTree from '../JsonTree';
import { receiveMessage } from '../../events/MessageService';

const NotificationMessage = () => {
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState('none');

  useEffect(() => {
    receiveMessage().subscribe(message => {
      if (message.name === 'operation-notification') {
        if (message.signal) {
          setStatus(message.data.status);
          setMessageText(message.data.text);
        } else {
          setStatus('none');
          setMessageText('');
        }
      }
    });
  }, []);

  return (
    <div className={`operation-notification ${status}`}>
      <div className="operation-notification-message">
        {status === 'inprogress' && (
          <>Your Json content is being flattened. Please wait few seconds</>
        )}
        {status === 'success' && (
          <>
            Your Json content has successfully flattened and your processed
            output is ready
          </>
        )}
        {status === 'failure' && (
          <>{`${messageText || 'Your Json input cannot be processed'}`}</>
        )}
      </div>
    </div>
  );
};

export default NotificationMessage;
