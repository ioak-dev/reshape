import React, { useState } from 'react';
import './JsonFlatten.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';
import { Authorization } from '../Types/GeneralTypes';
import OakTextPlain from '../../oakui/OakTextPlain';
import { httpGet, httpPost } from '../Lib/RestTemplate';
import constants from '../Constants';
import OakAttach from '../../oakui/OakAttach';
import JsonTree from '../JsonTree';
import InspectView from './InspectView';
import FlattenView from './FlattenView';
import OakSwitch from '../../oakui/OakSwitch';
import OakTab from '../../oakui/OakTab';
import { sendMessage } from '../../events/MessageService';
import { isValidJsonText } from '../Lib/JsonUtils';
import NotificationMessage from './NotificationMessage';
import CsvView from './CsvView';

const JsonFlatten = () => {
  const [inputData, setInputData] = useState<any>({
    text: '',
    file: null,
  });
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

  const handleChange = event => {
    setInputData({ text: event.target.value, file: null });
  };

  const handleFileUpload = event => {
    setInputData({ text: event[0].name, file: event[0] });
  };

  const flatten = operationType => {
    let baseUrl = `${constants.API_JSON_FLATTEN}`;
    if (operationType === 'flattenTraditional') {
      baseUrl = `${constants.API_JSON_FLATTEN}/traditional`;
    }
    let payload: any = '';
    if (inputData.file) {
      const formData = new FormData();
      formData.append('attachment', inputData.file, inputData.file?.name);
      payload = formData;
      baseUrl += '/file';
    } else {
      payload = { data: JSON.parse(inputData.text) };
    }

    try {
      httpPost(baseUrl, payload, null)
        .then(response => {
          if (response.status === 200) {
            setResult(response.data);
            sendMessage('operation-flatten-progress', true, {
              status: 'success',
            });
          } else {
            sendMessage('operation-flatten-progress', true, {
              status: 'failure',
            });
          }
        })
        .catch(error =>
          sendMessage('operation-flatten-progress', true, {
            status: 'failure',
          })
        );
    } catch (error) {
      sendMessage('operation-flatten-progress', true, {
        status: 'failure',
      });
    }
  };

  const toCsv = () => {
    let baseUrl = `${constants.API_JSON_TO_CSV}`;
    let payload: any = '';
    if (inputData.file) {
      const formData = new FormData();
      formData.append('attachment', inputData.file, inputData.file?.name);
      payload = formData;
      baseUrl += '/file';
    } else {
      payload = { data: JSON.parse(inputData.text) };
    }

    try {
      httpPost(baseUrl, payload, null)
        .then(response => {
          if (response.status === 200) {
            setResult(response.data);
            console.log(response);
            sendMessage('operation-csv-progress', true, {
              status: 'success',
            });
          } else {
            sendMessage('operation-csv-progress', true, {
              status: 'failure',
            });
          }
        })
        .catch(error =>
          sendMessage('operation-csv-progress', true, {
            status: 'failure',
          })
        );
    } catch (error) {
      sendMessage('operation-csv-progress', true, {
        status: 'failure',
      });
    }
  };

  const process = operationType => {
    setResult('');
    setOperation('');
    sendMessage('operation-notification', false);
    if (inputData.file) {
      // isValidJsonText()
      console.log('validation');
    } else if (!isValidJsonText(inputData.text)) {
      sendMessage('operation-notification', true, {
        status: 'failure',
        text: 'Not a valid Json content',
      });
      return;
    }
    setOperation(operationType);
    switch (operationType) {
      case 'flatten':
      case 'flattenTraditional':
        sendMessage('operation-flatten-progress', true, {
          status: 'inprogress',
        });
        flatten(operationType);
        break;
      case 'toCsv':
        sendMessage('operation-csv-progress', true, {
          status: 'inprogress',
        });
        toCsv();
        break;
      case 'format':
        console.log('format');
        break;
      case 'inspect':
        if (inputData.file) {
          // setResult(inputData.text);
          console.log('not implemented');
        } else {
          setResult(inputData.text);
        }

        break;
      default:
        break;
    }
  };

  return (
    <div className="json-flatten">
      <div className="json-flatten-container app-content">
        <div>
          <div className="typography-10">Flatten JSON</div>
          <div className="typography-5">
            Flatten an arbitarily nested Json structure into a flat Json
            structure using intelligent relational break down
          </div>
        </div>
        <div className="inputData-input">
          <OakTab
            meta={[
              {
                slotName: 'browse',
                label: 'Upload file',
                icon: 'folder_open',
              },
              {
                slotName: 'paste',
                label: 'Paste text',
                icon: 'file_copy',
              },
            ]}
          >
            <div className="browse" slot="browse">
              <OakAttach handleChange={handleFileUpload} />
            </div>
            <div slot="paste">
              <OakTextPlain
                data={inputData}
                id="text"
                handleChange={handleChange}
                multiline
              />
            </div>
          </OakTab>
        </div>
        <div className="action-footer">
          <OakButton
            theme="primary"
            variant={operation === 'format' ? 'regular' : 'drama'}
            action={() => process('format')}
          >
            Format
          </OakButton>
          <OakButton
            theme="primary"
            variant={operation === 'inspect' ? 'regular' : 'drama'}
            action={() => process('inspect')}
          >
            Inspect
          </OakButton>
          <OakButton
            theme="primary"
            variant={operation === 'toCsv' ? 'regular' : 'drama'}
            action={() => process('toCsv')}
          >
            Convert to CSV
          </OakButton>
          <OakButton
            theme="primary"
            variant={operation === 'flatten' ? 'regular' : 'drama'}
            action={() => process('flatten')}
          >
            Flatten Relational
          </OakButton>
          <OakButton
            theme="primary"
            variant={operation === 'flattenTraditional' ? 'regular' : 'drama'}
            action={() => process('flattenTraditional')}
          >
            Flatten Traditional
          </OakButton>
        </div>
        <NotificationMessage />
        {operation === 'inspect' && (
          <div className="inspect-view-operation">
            <InspectView data={result} />
          </div>
        )}
        {['flatten', 'flattenTraditional'].includes(operation) && (
          <div className="flatten-view-operation">
            <FlattenView data={result} />
          </div>
        )}
        {['toCsv'].includes(operation) && (
          <div className="csv-view-operation">
            <CsvView data={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonFlatten;
