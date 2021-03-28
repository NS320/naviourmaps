import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../utils/Header';
import Address from './Address'
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import "../../App.css";

class Home extends React.Component {
    render() {
            return (
                <div>
                    <Header />
                    user_id：{this.props.App_UserId}<br/>
                    biography：{this.props.App_Biography}<br/>
                    isLogin：{this.props.App_IsLogin}
                    <Address />
                    <div className="button-right">
                        <Button  component={Link} to="/NewAddress" variant="contained" color="primary"><LibraryAddIcon />New Address</Button>
                    </div>
                </div>
            );
        }
    }

export default Home;