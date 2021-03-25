import React from 'react';
import Header from '../../utils/Header';
import Test2 from './Test2'
import Address from './Address'

class Home extends React.Component {
    render() {
            return (
                <div>
                    <Header />
                    <Address />
                </div>
            );
        }
    }

export default Home;