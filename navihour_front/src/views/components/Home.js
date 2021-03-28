import React from 'react';
import Header from '../../utils/Header';
import Address from './Address'

class Home extends React.Component {
    render() {
            return (
                <div>
                    <Header />
                    user_id：{this.props.App_UserId}<br/>
                    biography：{this.props.App_Biography}<br/>
                    isLogin：{this.props.App_IsLogin}
                    <Address />
                </div>
            );
        }
    }

export default Home;