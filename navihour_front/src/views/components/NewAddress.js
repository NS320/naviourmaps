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
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

class NewAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: PropTypes.string,
            address: PropTypes.string,
            address_name: PropTypes.string,
            is_favorite: false,
            is_private: true,
            message: PropTypes.string,
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

    registerNewAddress = () => {
        this.changeIsLoading();
        const json = {
            user_id: this.props.App_UserId,
            address: this.state.address,
            address_name: this.state.address_name,
            is_favorite: this.state.is_favorite,
            is_private: this.state.is_private,
        };
        console.log(json);
        postApi("post_address", json)
            .then((return_json) => {
                if (return_json["result"] === "OK") {
                    this.props.history.push('/Home');
                    this.changeIsLoading();
                }
                else {
                    console.log(return_json["message"]);
                    this.setMessage("※" + return_json["message"]);
                    this.changeIsLoading();
                }
            });
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                {this.state.is_loding ? <LoadingPage /> : ""}
                <CssBaseline />
                <div className={UseStyles.paper}>
                    <Typography component="h1" variant="h5">
                        Register Address <HomeSharpIcon />
                    </Typography>
                    <form className={UseStyles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
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
                                onClick={this.registerNewAddress}
                            >
                                <HomeSharpIcon />Register
                            </Button>
                            <Button
                                color="default"
                                component={Link}
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
        );
    }
}
export default withRouter(NewAddress);