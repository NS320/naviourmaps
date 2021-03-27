import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { UseStyles } from '../../utils/utils';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import StarRateIcon from '@material-ui/icons/StarRate';
import LockIcon from '@material-ui/icons/Lock';
import Switch from '@material-ui/core/Switch';
import { postApi, getApi } from '../../utils/Api';
import "../../App.css";

class NewAddress extends React.Component {
    //ToDo user_id は 親コンポーネントから受け取った値を入れる。
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            address: '',
            address_name: '',
            is_favorite: false,
            is_private: true,
            message: ''
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

    registerNewAddress = () => {
        const json = {
            user_id: this.state.user_id,
            address: this.state.address,
            address_name: this.state.address_name,
            is_favorite: this.state.is_favorite,
            is_private: this.state.is_private,
        };
        console.log(json);
        postApi("Post_Address", json)
            .then((return_json) => {
                if (return_json["result"] == "OK") {
                    this.props.history.push('/Address')
                }
                else {
                    console.log(return_json["message"]);
                    this.setMessage("※" + return_json["message"]);
                }
            });
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
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
                        </div>
                        <br/><font color="red">{this.state.message}</font>
                    </form>
                </div>
            </Container>
        );
    }
}
export default NewAddress;