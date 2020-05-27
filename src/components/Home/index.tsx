import React from 'react';
import './style.scss';
import { Authorization } from '../Types/GeneralTypes';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  authorization: Authorization;
  history: any;
}

const Home = (props: Props) => {
  return <div className="main-page">class</div>;
};

export default Home;
