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
import {Validation_ForPassword} from '../../utils/utils';
import {PublicEncrypt} from '../../utils/Crypt';

class EditPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.App_UserId,
            password: '',
            new_password: '',
            check_password: '',
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

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    changeNew_password = (event) => {
        this.setState({ new_password: event.target.value });
    };

    changeCheck_password = (event) => {
        this.setState({ check_password: event.target.value });
    };

    isEmptyInputValue = () => {
        if(!this.state.password){
          this.setMessage("Please enter Password");
          return true;
        }
        if(!this.state.new_password){
            this.setMessage("Please enter new Password");
            return true;
        }
          if(!this.state.check_password){
            this.setMessage("Please enter reconfirmation Password");
            return true;
        }
        return false;
    };
    
    checkInputValue(){
        if(this.isEmptyInputValue()){
          return false;
        }
        var appropriatePassword = Validation_ForPassword(this.state.password);
        if(!appropriatePassword["isValid"]){
          this.setMessage(appropriatePassword["message"])
          return false;
        }
        var appropriateNewPassword = Validation_ForPassword(this.state.new_password);
        if(!appropriateNewPassword["isValid"]){
          this.setMessage(appropriateNewPassword["message"])
          return false;
        }
        var appropriateCheckPassword = Validation_ForPassword(this.state.check_password);
        if(!appropriateCheckPassword["isValid"]){
          this.setMessage(appropriateCheckPassword["message"])
          return false;
        }
        return true;
    };

    EditPassword = () => {
        if(!this.checkInputValue()){
            return;
        }

        if(this.state.new_password !== this.state.check_password){
            this.setMessage("新しいパスワードが確認と異なります");
            return;
        }

        this.changeIsLoading();
        var encryptPass = PublicEncrypt(this.state.password);
        var encryptNewPass1 = PublicEncrypt(this.state.new_password);
        var encryptNewPass2 = PublicEncrypt(this.state.check_password);
        const json = {
            user_id: this.state.user_id,
            password: encryptPass,
            new_password1: encryptNewPass1,
            new_password2: encryptNewPass2
        };

        postApi("reset_pass", json)
            .then((return_json) => {
                if (return_json["result"] === "OK") {
                    this.props.history.push('/Home')
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
                        パスワード変更
                    </Typography>
                    <form className={UseStyles.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="現在のパスワード"
                                type="password"
                                onChange={this.changePassword}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="新しいパスワード"
                                type="password"
                                onChange={this.changeNew_password}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="新しいパスワード（確認）"
                                type="password"
                                onChange={this.changeCheck_password}
                            />
                            </Grid>
                        </Grid>
                        <br /><font color="red">{this.state.message}</font>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={UseStyles.submit}
                            onClick={this.EditPassword}
                        >
                            変更
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="./EditUser" variant="body2">
                                    アカウント情報の変更はこちら
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
export default withRouter(EditPassword);
