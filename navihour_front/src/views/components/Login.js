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
import {FreeMessage, UseStyles} from '../../utils/utils';
import {Email, Password} from '../../utils/utils';
import {postApi} from '../../utils/Api';
import LoadingPage from '../../utils/LoadingPage';
import { withRouter } from 'react-router'
import {PublicEncrypt} from '../../utils/Crypt';
import {Validation_ForPassword, Validation_ForEmail} from '../../utils/utils';

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: '',
      name: '',
      email: '', // Loginする際に使用
      password: '', // Loginする際に使用
      biography: '',
      message: '',
      is_loding: false,
    }
  }

  setMessage = (message) => {
    this.setState({message: message});
  }

  changeMail = (event) => {
    this.setState({email: event.target.value});
  };

  changePassword = (event) => {
    this.setState({password: event.target.value});
  };

  isEmptyInputValue = () => {
    if(!this.state.email){
      this.setMessage("Please enter Email");
      return true;
    }
    if(!this.state.password){
      this.setMessage("Please enter Password");
      return true;
    }
    return false;
  }

  checkInputValue(){
    if(this.isEmptyInputValue()){
      return false;
    }
    var appropriateEmail = Validation_ForEmail(this.state.email);
    if(!appropriateEmail["isValid"]){
      this.setMessage(appropriateEmail["message"])
      return false;
    }
    var appropriatePassword = Validation_ForPassword(this.state.password);
    if(!appropriatePassword["isValid"]){
      this.setMessage(appropriatePassword["message"])
      return false;
    }
    return true;
  }

  // ログイン処理
  Login = () =>{
    if(!this.checkInputValue()){
      return;
    }
    
    this.changeIsLoading();
    var encryptEmail = PublicEncrypt(this.state.email);
    var encryptPass = PublicEncrypt(this.state.password);

    const json = {email: encryptEmail,
      password: encryptPass};
      
    postApi("login", json)
    .then((return_json)=>{
      if(return_json["result"] === "OK"){
        this.props.App_SetUserId(return_json["user_id"]);
        this.props.App_SetBiography(return_json["biography"]);
        this.props.App_SetIsLogin(true);
        this.props.history.push('/Home');
      }
      else{
        this.setMessage(return_json["message"]);
      }
      this.changeIsLoading();
    });
  }

  changeIsLoading = () => {
    this.setState({ is_loding: !this.state.is_loding });
  };

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
          ログイン
        </Typography>
        <form className={UseStyles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={Email}
            label="メールアドレス"
            autoComplete={Email}
            autoFocus
            onChange={this.changeMail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="パスワード"
            type="password"
            id={Password}
            autoComplete={Password}
            onChange={this.changePassword}
          />
          <br/><font color="red">{this.state.message}</font>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={UseStyles.submit}
            onClick={this.Login}
          >
            ログイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="./ResetPassword" variant="body2">
                パスワードを忘れた方はこちら
              </Link>
            </Grid>
            <Grid item>
              <Link href="./SignUp" variant="body2">
                {"アカウントの新規作成"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <FreeMessage />
      </Box>
    </Container>
  );
}
}
export default withRouter(Login);