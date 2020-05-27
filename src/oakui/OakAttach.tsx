import React, { ReactNode, useState } from 'react';
import './styles/oak-attach.scss';
import OakIcon from './OakIcon';
import OakButton from './OakButton';

interface Props {
  handleChange: Function;
  onlyButton?: boolean;
}

const OakAttach = (props: Props) => {
  const [dragClass, setDragClass] = useState('');
  const [files, setFiles] = useState([]);
  const dragOver = event => {
    event.preventDefault();
    setDragClass('dropping');
  };
  const dragLeave = event => {
    event.preventDefault();
    setDragClass('');
  };
  const drop = event => {
    event.preventDefault();
    setDragClass('');
    processFiles(event.dataTransfer.files);
    setDragClass('');
  };
  const chooseFiles = event => {
    processFiles(event.target.files);
  };
  const processFiles = files => {
    setFiles(files);
    props.handleChange(files);
  };

  return (
    <div className="oak-attach">
      {!props.onlyButton && (
        <div
          className={`drop-container ${dragClass}`}
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        >
          <div>
            <i className="material-icons">cloud_upload</i>
          </div>
          <div>Drop your files here</div>
          <div>or</div>
          <div className="file-input">
            <label className="file-upload space-top-1 space-bottom-4">
              <input type="file" onChange={chooseFiles} multiple required />
              <div className="action">
                <i className="material-icons">attach_file</i>
                <div className="text">Browse</div>
              </div>
            </label>
          </div>
        </div>
      )}
      {props.onlyButton && (
        <div className="file-input button-only">
          <label className="file-upload">
            <input type="file" onChange={chooseFiles} multiple required />
            <div className="action-browse">
              <i className="material-icons">folder_open</i>
              <div className="browse-link">Browse</div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default OakAttach;
