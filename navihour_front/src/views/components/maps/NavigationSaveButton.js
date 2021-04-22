import React, { Component, createRef } from 'react'
import { postApi } from '../../../utils/Api';
import TextField from '@material-ui/core/TextField';
import LoadingPage from '../../../utils/LoadingPage';
import Button from '@material-ui/core/Button';
import "../../../App.css";

class NavigationSaveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.App_UserId,
            navigation_name: '',
            is_loding: false,
            message: ''
        }
    }

    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };
    
    changeNavigationName = (event) => {
        this.setState({ navigation_name: event.target.value });
    };

    postNavigation = (row) => {
        this.changeIsLoading();
        this.setState({ message: "" });
        var navigation_name = this.props.StartAddress["address"].slice(0, 20);
        if (this.state.navigation_name !== ""){
            navigation_name = this.state.navigation_name;
        }
        const send_json = {
            user_id: this.state.user_id, 
            navigation_name: navigation_name,
            start_address: this.props.StartAddress["address"], 
            start_lat: this.props.StartAddress["lat"], 
            start_lng: this.props.StartAddress["lng"], 
            goal_address: this.props.GoalAddress["address"], 
            goal_lat: this.props.GoalAddress["lat"], 
            goal_lng: this.props.GoalAddress["lng"]
        } 
        console.log(send_json);
        postApi("post_navigations", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.props.reloadMyNavigation();
                this.setState({ navigation_name: "" });
            }else{
                this.setState({ message: "Please slect the route!" });
            }
            this.changeIsLoading();
        });
    }

    render() {
        return (
            <div className="side-by-side">
                {this.state.is_loding ? <LoadingPage /> : ""}
                <div className='vertically'>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id={"NavigationName"}
                        label="Enter Navigation Name"
                        autoComplete={"NavigationName"}
                        autoFocus
                        onChange={this.changeNavigationName}
                    />
                    <br/><font color="red">{this.state.message}</font>
                </div>
                <Button 
                    className="button-size"
                    onClick={() => {this.postNavigation()}}
                    variant="contained"
                    style={{ color: "yellow", backgroundColor: "#004d40" }}
                >
                    Save
                </Button>
            </div>
        )
    }
}

export default NavigationSaveButton;
