import React, { useState, useContext } from 'react'; 
import styled from 'styled-components'; 

import RenderFeed from '../feed/renderFeed.js';
//to be changed 
import { sampleUser, threads, SampleCommunity } from '../helperTools/dummyData.js'; 

const Home = props => {
    return (
        <RenderFeed data={threads} isCommunity={false} />
        )
} 

export default Home; 