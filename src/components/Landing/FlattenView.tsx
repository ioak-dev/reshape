import React, { useState, useEffect } from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';
import { Authorization } from '../Types/GeneralTypes';
import HowDoesItWork from './HowDoesItWork';
import JsonTree from '../JsonTree';
import { receiveMessage } from '../../events/MessageService';

interface Props {
  data: any;
}

const FlattenView = (props: Props) => {
  const [preview, setPreview] = useState(false);
  const [progress, setProgress] = useState('none');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    receiveMessage().subscribe(message => {
      if (message.name === 'operation-flatten-progress') {
        setMessageText(message.data.text);
        if (message.signal) {
          setProgress(message.data.status);
        } else {
          setProgress('none');
        }
      }
    });
  }, []);

  const download = event => {
    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
      JSON.stringify(props.data)
    )}`;
    link.download = 'output.json';
    link.click();
  };
  return (
    <div className="flatten-view">
      <div className={`flatten-view-header ${progress}`}>
        <div className="operation-message">
          {progress === 'inprogress' && (
            <>Your Json content is being flattened. Please wait few seconds</>
          )}
          {progress === 'success' && (
            <>
              Your Json content has successfully flattened and your processed
              output is ready
            </>
          )}
          {progress === 'failure' && (
            <>{`${messageText || 'Your Json input cannot be processed'}`}</>
          )}
        </div>
        {progress === 'success' && (
          <div className="micro-action-header">
            <OakButton
              theme="primary"
              variant="drama"
              action={() => setPreview(!preview)}
            >
              {preview ? 'Hide preview' : 'Show preview'}
            </OakButton>
            <OakButton theme="primary" variant="regular" action={download}>
              Download
            </OakButton>
          </div>
        )}
      </div>
      <div className="flatten-view-content">
        {preview && <JsonTree element="" data={props.data} expand />}
      </div>
    </div>
  );
};

export default FlattenView;
