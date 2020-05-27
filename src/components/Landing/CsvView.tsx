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

const CsvView = (props: Props) => {
  const [preview, setPreview] = useState(false);
  const [progress, setProgress] = useState('none');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    receiveMessage().subscribe(message => {
      if (message.name === 'operation-csv-progress') {
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
      props.data
    )}`;
    link.download = 'output.csv';
    link.click();
  };
  return (
    <div className="csv-view">
      <div className={`csv-view-header ${progress}`}>
        <div className="operation-message">
          {progress === 'inprogress' && (
            <>
              Your Json content is being converted to CSV. Please wait few
              seconds
            </>
          )}
          {progress === 'success' && (
            <>
              Your Json content has successfully been converted to CSV and your
              output is ready for download
            </>
          )}
          {progress === 'failure' && (
            <>{`${messageText || 'Your Json input cannot be processed'}`}</>
          )}
        </div>
        {progress === 'success' && (
          <div className="micro-action-header">
            <OakButton theme="primary" variant="regular" action={download}>
              Download
            </OakButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvView;
