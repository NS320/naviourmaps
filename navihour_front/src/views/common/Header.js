import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Logo from '../icon/NaviOur.png'
import "../../App.css";

class Header extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() {
            return (
                <div>
                    <AppBar className="header-header"  position="static" style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}>
                        <Toolbar>
                            <Typography variant="h6">
                                <img src={Logo} />
                            </Typography>
                            <div className="button-side-by-side">
                                <Button 
                                    className="margin-right" 
                                    component={Link} 
                                    to="/Login" 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => {this.props.App_SetIsLogin(false)}}
                                >
                                    Logout
                                </Button>
                                <Button component={Link} to="/EditUser" variant="contained" style={{ color: "#004d40" }}><SettingsIcon/></Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    }

export default Header;