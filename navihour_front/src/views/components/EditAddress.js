import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { UseStyles } from '../../utils/utils';
import LoadingPage from '../../utils/LoadingPage';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import StarRateIcon from '@material-ui/icons/StarRate';
import LockIcon from '@material-ui/icons/Lock';
import Switch from '@material-ui/core/Switch';
import { postApi } from '../../utils/Api';
import "../../App.css";
import Dialog from '@material-ui/core/Dialog';
import { withRouter } from 'react-router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class EditAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.row.is_edit_open,
            address_id: this.props.row.address_id,
            address: this.props.row.address,
            address_name: this.props.row.address_name,
            is_favorite: this.props.row.is_favorite,
            is_private: this.props.row.is_private,
            is_loding: false,
        }
    }

    setMessage = (message) => {
        this.setState({message: message});
    }

    setAddressName = (event) => {
        this.setState({ address_name: event.target.value });
    };

    setAddress = (event) => {
        this.setState({ address: event.target.value });
    }

    changeIsFavorite = () => {
        this.setState({ is_favorite: !this.state.is_favorite });
    };

    changeIsPrivate = () => {
        this.setState({ is_private: !this.state.is_private });
    };

    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };

    updateAddress = () => {
        this.changeIsLoading();
        const json = {
            address_id: this.state.address_id,
            address: this.state.address,
            address_name: this.state.address_name,
            is_favorite: this.state.is_favorite,
            is_private: this.state.is_private,
        };
        console.log(json);
        postApi("put_address", json)
            .then((return_json) => {
                if (return_json["result"] === "OK") {
                    this.props.history.push('/Home');
                }
                else {
                    console.log(return_json["message"]);
                    this.setMessage("※" + return_json["message"]);
                }
                this.changeIsLoading();
                this.props.chanegeIsEditOpen();
            });
    }

    handleClose = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={this.state.isOpen}>
                <Container component="main" maxWidth="xs">
                    {this.state.is_loding ? <LoadingPage /> : ""}
                    <CssBaseline />
                    <div className={UseStyles.paper}>
                        <Typography component="h1" variant="h5">
                            Update Address <HomeSharpIcon />
                        </Typography>
                        <form className={UseStyles.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                defaultValue={this.state.address_name}
                                id={"AddressName"}
                                label="Enter Address Name"
                                autoComplete={"AddressName"}
                                autoFocus
                                onChange={this.setAddressName}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                defaultValue={this.state.address}
                                label="Enter Address"
                                id={"Address"}
                                autoComplete={"Address"}
                                onChange={this.setAddress}
                            />
                            <div className="flex">
                                <StarRateIcon style={{ color: "#004d40" }} />
                                <Switch
                                    checked={this.state.is_favorite}
                                    onChange={this.changeIsFavorite}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <LockIcon />
                                <Switch
                                    checked={this.state.is_private}
                                    onChange={this.changeIsPrivate}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <Button
                                    style={{ color: "white", backgroundColor: "#004d40" }}
                                    fullWidth
                                    variant="contained"
                                    className={UseStyles.submit}
                                    onClick={this.updateAddress}
                                >
                                    <HomeSharpIcon />Update
                                </Button>
                                <Button
                                    color="default"
                                    onClick={this.props.chanegeIsEditOpen}
                                    fullWidth
                                    to="/Home"
                                    className={UseStyles.submit}
                                    variant="contained"
                                >
                                    Back <ArrowBackIcon />
                                </Button>
                            </div>
                            <br/><font color="red">{this.state.message}</font>
                        </form>
                    </div>
                </Container>
            </Dialog>
        );
    }
}

export default withRouter(EditAddress);
