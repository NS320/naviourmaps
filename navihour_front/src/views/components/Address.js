import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { Link } from 'react-router-dom';
import "../../App.css";

class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: PropTypes.string,
            allAddressList: [],
            is_loding: true,
        }
    }

    createData = (address_id, is_favorite, address_name, address, address_created_time, is_private) => {
        return { address_id, is_favorite, address_name, address, address_created_time, is_private };
    }

    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };

    setAddressList = (addressId, setKey, setValue) => {
        const allAddressList = this.allAddressList.slice();

        allAddressList.map((addressData) => {
            if (addressData.addressId === addressId){
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
                const data = this.createData(row.address_id, row.is_favorite, row.address_name, row.address, row.address_created_time, row.is_private);
                return_all_address.push(data);
            })
            this.setState({ allAddressList: return_all_address });
            this.changeIsLoading();
        });
    }

    changeFavorite = (row) => {
        // API完成後,コメントアウト解除
        // const send_json = { addressId: row.addressId, isFavorite: row.isFavorite };
        // postApi("Favarite_Address", send_json)
        // .then((return_json) => {
        //      //resultとmessageが返ってくる
        // });
        this.setAddressList(row.addressId, "isFavorite", !row.isFavorite);
    }

    changePrivate = (row) => {
        // API完成後,コメントアウト解除
        // const send_json = { addressId: row.addressId, isPrivate: row.isPrivate };
        // postApi("Private_Address", send_json)
        // .then((return_json) => {
        //      //resultとmessageが返ってくる
        // });
        this.setAddressList(row.addressId, "isPrivate", !row.isPrivate);
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
                <Button  component={Link} to="/NewAddress" variant="contained" color="primary"><LibraryAddIcon />New Address</Button>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allAddressList.map((row) => (
                            <TableRow>
                                <TableCell><Button onClick={() => { this.changeFavorite(row) }}>{row.is_favorite ? <StarRateIcon style={{ color: "#004d40" }} /> : <StarBorderIcon />}</Button></TableCell>
                                <TableCell align="right">{row.address_name}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.address_created_time}</TableCell>
                                <TableCell><Button onClick={() => { this.changePrivate(row) }}>{row.is_private ? <LockIcon /> : <LockOpenIcon />}</Button></TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="button-right">
                <Button  component={Link} to="/NewAddress" variant="contained" color="primary"><LibraryAddIcon />New Address</Button>
                <Button onClick={() => { this.reload() }} variant="contained" style={{ color: "#004d40" }}><ReplayIcon />Reload</Button>
            </div>
        </ div>
        );
    }
}

export default Address;
