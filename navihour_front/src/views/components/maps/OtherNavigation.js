import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { postApi } from '../../../utils/Api';
import LoadingPage from '../../../utils/LoadingPage';
import Button from '@material-ui/core/Button';
import OtherNavigationsLogo from '../../icon/OtherNavigations.png'
import "../../../App.css";

class OtherNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.App_UserId,
            otherNavigationList: [],
            is_loding: true,
        }
    }

    createData = (navigation_id, navigation, navigation_created_time, start_address, start_lat, start_lng, goal_address, goal_lat, goal_lng) => {
        return { navigation_id, navigation, navigation_created_time, start_address, start_lat, start_lng, goal_address, goal_lat, goal_lng};
    }
    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };

    getOtherNavigation = () => {
        const json = {
            user_id: this.state.user_id
        };
        postApi("get_others_navigations", json)
        .then((return_json) => {
            const return_my_navigation = [];
            return_json["others_navigations_list"].map((row)=>{
                const data = this.createData(
                    row.navigation_id, 
                    row.navigation_name, 
                    row.navigation_created_time, 
                    row.start_address,
                    row.start_lat,
                    row.start_lng,
                    row.goal_address,
                    row.goal_lat,
                    row.goal_lng,
                    );
                return_my_navigation.push(data);
            })
            this.setState({ otherNavigationList: return_my_navigation });
            this.changeIsLoading();
        });
    }

    reload = () => {
        this.changeIsLoading();
        this.getOtherNavigation();
    }

    componentDidMount(){
        this.getOtherNavigation();
    }

    render() {
        return (
        <div className="other-navigation-table">
            {this.state.is_loding ? <LoadingPage /> : ""}
            <img src={OtherNavigationsLogo} width="100%" height="auto"/>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#004d40" }}>
                            <TableCell style={{ color: "yellow" }} align="right">Route</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.otherNavigationList.map((row) => (
                            <TableRow 
                                hover
                            >
                                <TableCell align="right">
                                    <Button onClick={
                                        () => { 
                                            this.props.setStartAddress({address: row.start_address, lat: row.start_lat, lng: row.start_lng}) 
                                            this.props.setGoalAddress({address: row.goal_address, lat: row.goal_lat, lng: row.goal_lng})
                                            }
                                        }
                                    >
                                        {row.navigation}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </ div>
        );
    }
}

export default OtherNavigation;
