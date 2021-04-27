import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import StarRateIcon from '@material-ui/icons/StarRate';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { postApi } from '../../../utils/Api';
import LoadingPage from '../../../utils/LoadingPage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import MyNavigationsLogo from '../../icon/MyNavigations.png'
import EditNavigation from './EditNavigation';
import "../../../App.css";


class MyNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.App_UserId,
            myNavigationList: [],
            is_loding: true,
        }
    }

    createData = (navigation_id, is_favorite, navigation, navigation_created_time, is_private, start_address, start_lat, start_lng, goal_address, goal_lat, goal_lng, is_edit_open) => {
        return { navigation_id, is_favorite, navigation, navigation_created_time, is_private, start_address, start_lat, start_lng, goal_address, goal_lat, goal_lng, is_edit_open };
    }

    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };

    setNavigationList = (navigation_id, setKey, setValue) => {
        const myNavigationList = this.state.myNavigationList.slice();

        myNavigationList.map((navigatiData) => {
            if (navigatiData.navigation_id === navigation_id){
                navigatiData[setKey] = setValue;
            }
        });
        this.setState({ myNavigationList: myNavigationList });
    }

    getMyNavigation = () => {
        const json = {
            user_id: this.state.user_id
        };
        postApi("get_my_navigations", json)
        .then((return_json) => {
            const return_my_navigation = [];
            return_json["my_navigations_list"].map((row)=>{
                const data = this.createData(
                    row.navigation_id, 
                    row.is_favorite, 
                    row.navigation_name, 
                    row.navigation_created_time, 
                    row.is_private, 
                    row.start_address,
                    row.start_lat,
                    row.start_lng,
                    row.goal_address,
                    row.goal_lat,
                    row.goal_lng,
                    false
                );
                return_my_navigation.push(data);
            })
            this.setState({ myNavigationList: return_my_navigation });
            this.changeIsLoading();
        });
    }

    changeFavorite = (row) => {
        this.changeIsLoading();
        const send_json = { navigation_id: row.navigation_id, is_favorite: !row.is_favorite };
        postApi("favorite_navigation", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.setNavigationList(row.navigation_id, "is_favorite", !row.is_favorite);
            }else{
                // ToDo　サーバ側でエラーが出た時の処理を書く
            }
            this.changeIsLoading();
        });
    }

    changePrivate = (row) => {
        this.changeIsLoading();
        const send_json = { navigation_id: row.navigation_id, is_private: !row.is_private };
        postApi("private_navigation", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.setNavigationList(row.navigation_id, "is_private", !row.is_private);
            }else{
                // ToDo　サーバ側でエラーが出た時の処理を書く
            }
            this.changeIsLoading();
        });
    }

    deleteNavigation = (row) => {
        this.changeIsLoading();
        const send_json = { navigation_id: row.navigation_id };
        postApi("delete_navigation", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.getMyNavigation();
            }else{
                // ToDo　サーバ側でエラーが出た時の処理を書く
                this.changeIsLoading();
            }
        });
    }

    changeIsEditOpen = (row) => {
        this.setNavigationList(row.navigation_id, "is_edit_open", !row.is_edit_open);
        if(!row.is_edit_open){
            this.reload();
        }
    }

    reload = () => {
        this.changeIsLoading();
        this.getMyNavigation();
    }

    componentDidMount(){
        this.getMyNavigation();
    }

    render() {
        return (
        <div className="navigation-table margin-right">
            {this.state.is_loding ? <LoadingPage /> : ""}
            <img src={MyNavigationsLogo} width="50%" height="auto"/>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#004d40" }}>
                            <TableCell style={{ color: "yellow" }} >Favorite☆</TableCell>
                            <TableCell style={{ color: "yellow" }} align="right">Route</TableCell>
                            <TableCell style={{ color: "yellow" }} align="right">Privete</TableCell>
                            <TableCell style={{ color: "yellow" }} align="right">Edit</TableCell>
                            <TableCell style={{ color: "yellow" }} align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.myNavigationList.map((row) => (
                            <TableRow hover>
                                <TableCell><Button onClick={() => { this.changeFavorite(row) }}>{row.is_favorite ? <StarRateIcon style={{ color: "#004d40" }} /> : <StarBorderIcon />}</Button></TableCell>
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
                                <TableCell align="right"><Button onClick={() => { this.changePrivate(row) }}>{row.is_private ? <LockIcon /> : <LockOpenIcon />}</Button></TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => { this.changeIsEditOpen(row) }}>
                                        <EditIcon style={{ color: "#004d40" }}/>
                                    </Button>
                                    {row.is_edit_open ? <EditNavigation changeIsEditOpen={() => { this.changeIsEditOpen(row) }} row={row}/>: ""} 
                                </TableCell>
                                <TableCell align="right"><Button onClick={() => { this.deleteNavigation(row) }} className="delete-button"><DeleteForeverIcon/></Button></TableCell>
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

export default MyNavigation;
