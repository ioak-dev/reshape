import React, { useState, useEffect } from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';
import { Authorization } from '../Types/GeneralTypes';
import HowDoesItWork from './HowDoesItWork';
import JsonTree from '../JsonTree';

interface Props {
  data: any;
}

const InspectView = (props: Props) => {
  //   useEffect(() => console.log(JSON.parse(props.data)));
  const [expand, setExpand] = useState(true);
  useEffect(() => {
    console.log(JSON.parse(props.data));
  });
  return (
    <div className="inspect-view">
      <div
        className="typography-4 inspect-view-action"
        onClick={() => setExpand(!expand)}
      >
        {expand ? 'Collapse All' : 'Expand all'}
      </div>
      <div>
        <JsonTree element="" data={JSON.parse(props.data)} expand={expand} />
      </div>
    </div>
  );
};

export default InspectView;
