import React from 'react';
import Header from '../common/Header';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import Map from './maps/Map'

class Home extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
            return (
                <div>
                    <Header 
                        App_SetIsLogin = {this.props.App_SetIsLogin}
                    />
                    <Map />
                </div>
            );
        }
    }

export default Home;