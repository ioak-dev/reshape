import React, { useState } from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';
import { Authorization } from '../Types/GeneralTypes';
import JsonFlatten from './JsonFlatten';
import HowDoesItWork from './HowDoesItWork';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  authorization: Authorization;
  history: any;
}

const Landing = (props: Props) => {
  return (
    <div className="main-page">
      <div>
        <JsonFlatten />
      </div>
      <div>
        <HowDoesItWork />
      </div>
    </div>
  );
};

export default Landing;
