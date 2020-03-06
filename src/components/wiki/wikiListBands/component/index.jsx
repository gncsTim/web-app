import React from 'react';
import {Link} from 'react-router-dom';

const WikiListBands = ({bandList}) => {
   return <div>
            <h1>{bandList}</h1>
            <Link to="/WikiBands/1234">Venues</Link>
          </div>
 }

export default WikiListBands;
