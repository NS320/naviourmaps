import React from 'react';
import { TableSortLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import StarRateIcon from '@material-ui/icons/StarRate';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { postApi } from '../../utils/Api';
import LoadingPage from '../../utils/LoadingPage';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import EditAddress from './EditAddress';
import NewAddress from './NewAddress';
import EditIcon from '@material-ui/icons/Edit';
import "../../App.css";

class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: PropTypes.string,
            allAddressList: [],
            is_loding: true,
            is_new_open: false
        }
    }

    createData = (address_id, is_favorite, address_name, address, address_created_time, is_private, is_edit_open) => {
        return { address_id, is_favorite, address_name, address, address_created_time, is_private, is_edit_open };
    }

    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };

    setAddressList = (address_id, setKey, setValue) => {
        const allAddressList = this.state.allAddressList.slice();

        allAddressList.map((addressData) => {
            if (addressData.address_id === address_id){
                addressData[setKey] = setValue;
            }
        });
        this.setState({ allAddressList: allAddressList });
    }

    getAllAddress = () => {
        const json = {
            user_id: this.props.App_UserId,
        };
        postApi("get_all_address", json)
        .then((return_json) => {
            const return_all_address = [];
            return_json["all_address_list"].map((row)=>{
                const data = this.createData(row.address_id, row.is_favorite, row.address_name, row.address, row.address_created_time, row.is_private, false);
                return_all_address.push(data);
            })
            this.setState({ allAddressList: return_all_address });
            this.changeIsLoading();
        });
    }

    changeFavorite = (row) => {
        this.changeIsLoading();
        const send_json = { address_id: row.address_id, is_favorite: !row.is_favorite };
        postApi("favorite_address", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.setAddressList(row.address_id, "is_favorite", !row.is_favorite);
            }else{
                // ToDo
            }
            this.changeIsLoading();
        });
    }

    changePrivate = (row) => {
        this.changeIsLoading();
        const send_json = { address_id: row.address_id, is_private: !row.is_private };
        postApi("private_address", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.setAddressList(row.address_id, "is_private", !row.is_private);
            }else{
                // ToDo
            }
            this.changeIsLoading();
        });
    }

    deleteAddress = (row) => {
        this.changeIsLoading();
        const send_json = { address_id: row.address_id };
        postApi("delete_address", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.getAllAddress();
            }else{
                // ToDo
                this.changeIsLoading();
            }
        });
    }

    chanegeIsEditOpen = (row) => {
        this.setAddressList(row.address_id, "is_edit_open", !row.is_edit_open);
        if(!row.is_edit_open){
            this.reload();
        }
    }

    chanegeIsNewOpen = () => {
        if(this.state.is_new_open){
            this.reload();
        }
        this.setState({ is_new_open: !this.state.is_new_open });
    }

    reload = () => {
        this.changeIsLoading();
        this.getAllAddress();
    }

    componentDidMount(){
        this.getAllAddress();
    }

    render() {
        return (
        <div className="address-table">
            {this.state.is_loding ? <LoadingPage /> : ""}
            <div className="button-left">
                <Button  onClick={() => { this.chanegeIsNewOpen()}} variant="contained" color="primary"><LibraryAddIcon />New Address</Button>
                {this.state.is_new_open ? <NewAddress user_id={this.props.App_UserId} is_new_open={this.state.is_new_open} chanegeIsNewOpen={() => { this.chanegeIsNewOpen() }}/>: ""}
                <Button onClick={() => { this.reload() }} variant="contained" style={{ color: "#004d40" }}><ReplayIcon />Reload</Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Favorite☆</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Created Time</TableCell>
                            <TableCell align="right">Privete</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allAddressList.map((row) => (
                            <TableRow 
                                hover
                            >
                                <TableCell><Button onClick={() => { this.changeFavorite(row) }}>{row.is_favorite ? <StarRateIcon style={{ color: "#004d40" }} /> : <StarBorderIcon />}</Button></TableCell>
                                <TableCell align="right">{row.address_name}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.address_created_time}</TableCell>
                                <TableCell align="right"><Button onClick={() => { this.changePrivate(row) }}>{row.is_private ? <LockIcon /> : <LockOpenIcon />}</Button></TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => { this.chanegeIsEditOpen(row) }}>
                                        <EditIcon style={{ color: "#004d40" }}/>
                                    </Button>
                                    {row.is_edit_open ? <EditAddress chanegeIsEditOpen={() => { this.chanegeIsEditOpen(row) }} row={row}/>: ""}
                                </TableCell>
                                <TableCell align="right"><Button onClick={() => { this.deleteAddress(row) }} className="delete-button"><DeleteForeverIcon/></Button></TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="button-right">
                <Button  onClick={() => { this.chanegeIsNewOpen()}} variant="contained" color="primary"><LibraryAddIcon />New Address</Button>
                {this.state.is_new_open ? <NewAddress user_id={this.props.App_UserId} is_new_open={this.state.is_new_open} chanegeIsNewOpen={() => { this.chanegeIsNewOpen() }}/>: ""}
                <Button onClick={() => { this.reload() }} variant="contained" style={{ color: "#004d40" }}><ReplayIcon />Reload</Button>
            </div>
        </ div>
        );
    }
}

export default Address;
