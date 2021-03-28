import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
    render() {
            return (
                <div>
                    <AppBar position="static" style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}>
                        <Toolbar>
                            <Typography variant="h6">
                                Navi Hour
                            </Typography>
                            <div style={{ flexGrow: 1 }}></div>
                            <Button component={Link} to="/TestApi" variant="contained" color="primary">Logout</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    }

export default Header;