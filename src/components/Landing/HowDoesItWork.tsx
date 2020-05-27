import React, { useState } from 'react';
import './HowDoesItWork.scss';

const HowDoesItWork = () => {
  return (
    <div className="how-does-it-work">
      <div className="how-does-it-work-container app-content">
        <div className="typography-10">How does it work?</div>
        <div className="typography-8">
          How does flattening a Json relationally work?
        </div>
        <div className="typography-5">
          Converts a Json document into multiple documents based on the internal
          structure. If the JSON has arrays inside, then it will be transformed
          into multiple rows retaining thre relation with it's neighbours
        </div>
      </div>
    </div>
  );
};

export default HowDoesItWork;
