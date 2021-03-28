// https://material-ui.com/components/tables/

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
import {getApi } from '../../utils/Api';

// https://material-ui.com/customization/palette/

class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allAddressList: [],
        }
    }

    createData = (addressId, isFavorite, name, address, createdTime, isPrivate) => {
        return { addressId, isFavorite, name, address, createdTime, isPrivate };
    }

    // api 完成までのdummyu
    allAddressList = [
        this.createData(1, true, '近くのマクドナルド', '池尻大橋', '1994/06/09 18:00:40', true),
        this.createData(2, true, 'みつおの家', '運河', '2000/06/09 18:00:40', false),
        this.createData(3, false, '外尾思い出のトイレ', '二子玉川のトイレ', '2015/06/09 18:00:40', false),
        this.createData(4, false, 'お気に入りの二郎', '神保町', '2017/06/09 18:00:40', true),
        this.createData(5, true, 'お気に入りのフォーレストラン', 'ベトナム・ホーチミン', '2021/01/09 18:00:40', true),
    ];

    setAddressList = (addressId, setKey, setValue) => {
        // const allAddressList = this.state.allAddressList.slice();
        const allAddressList = this.allAddressList.slice();

        allAddressList.map((addressData) => {
            if (addressData.addressId === addressId){
                addressData[setKey] = setValue;
            }
        });
        this.setState({ allAddressList: allAddressList });
    }

    //API完成後一番最初にたたく想定。
    //DBから住所をすべて取ってきてstateに入れる。
    getAllAddress = () => {
        getApi("Get_All_Address")
        .then((return_json) => {
            this.setState({ allAddressList: return_json["all_address_list"] });
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

    render() {
        //テスト用
        // this.setState({allAddressList: this.allAddressList});
        // const allAddressList = this.state.allAddressList;
        const allAddressList = this.allAddressList;
        return (
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
                        {allAddressList.map((row) => (
                            <TableRow>
                                <TableCell><Button onClick={() => { this.changeFavorite(row) }}>{row.isFavorite ? <StarRateIcon style={{ color: "#004d40" }} /> : <StarBorderIcon />}</Button></TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.createdTime}</TableCell>
                                <TableCell><Button onClick={() => { this.changePrivate(row) }}>{row.isPrivate ? <LockIcon /> : <LockOpenIcon />}</Button></TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Address;
