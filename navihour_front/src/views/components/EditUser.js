import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FreeMessage, UseStyles } from '../../utils/utils';
import { postApi } from '../../utils/Api';
import { withRouter } from 'react-router'
import LoadingPage from '../../utils/LoadingPage';
import PropTypes from 'prop-types';

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.App_UserId,
            new_user_id: this.props.App_UserId,
            name: this.props.Name,
            email: this.props.Email,
            biography: this.props.Biography,
            message: '',
            is_loding: false
        }
    }
    
    setMessage = (message) => {
        this.setState({message: message});
    }

    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };

    changeNewUserId = (event) => {
        this.setState({ new_user_id: event.target.value });
    };

    changeName = (event) => {
        this.setState({ name: event.target.value });
    };

    changeMail = (event) => {
        this.setState({ email: event.target.value });
    };

    changeBiography = (event) => {
        this.setState({ biography: event.target.value });
    };

    EditUser = () => {
        this.changeIsLoading();
        const json = {
            user_id: this.state.user_id,
            new_user_id: this.state.new_user_id,
            new_name: this.state.name,
            new_email: this.state.email,
            new_biography: this.state.biography
        };
        console.log(json);
        postApi("put_user", json)
            .then((return_json) => {
                if (return_json["result"] === "OK") {
                    this.props.history.push('/Home');
                    this.props.getUser(this.state.user_id);
                    this.props.App_SetBiography(this.state.biography);
                }
                else {
                    this.setMessage(return_json["message"]);
                }
                this.changeIsLoading();
            });
    }
    

    render() {
        return (
            <Container component="main" maxWidth="xs">
                {this.state.is_loding ? <LoadingPage /> : ""}
                <CssBaseline />
                <div className={UseStyles.paper}>
                    <Avatar className={UseStyles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        アカウント情報の更新
                    </Typography>
                    <form className={UseStyles.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    defaultValue={this.state.new_user_id}
                                    label="ユーザーID"
                                    onChange={this.changeNewUserId}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    defaultValue={this.state.name}
                                    label="名前"
                                    onChange={this.changeName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="メールアドレス"
                                    defaultValue={this.state.email}
                                    onChange={this.changeMail}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="プロフィール"
                                    defaultValue={this.state.biography}
                                    onChange={this.changeBiography}
                                />
                            </Grid>
                        </Grid>
                        <br /><font color="red">{this.state.message}</font>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={UseStyles.submit}
                            onClick={this.EditUser}
                        >
                            更新
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="./EditPassword" variant="body2">
                                    パスワードの変更はこちら
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="./Home" variant="body2">
                                    ホーム画面へ
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    {FreeMessage}
                </Box>
            </Container>
        );
    }
}
export default withRouter(EditUser);
