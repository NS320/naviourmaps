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
import {User_Id, Name, Email, Password, Biography} from '../../utils/utils';
import {postApi} from '../../utils/Api';
import PropTypes from 'prop-types';
import {PublicEncrypt} from '../../utils/Crypt';
import {Validation_ForPassword, Validation_ForEmail, Validation_ForUserId} from '../../utils/utils';

class SignUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: '',
      name: '',
      email: '',
      password: '',
      biography: '',
      message: ''
    }
  }

  setMessage = (message) => {
    this.setState({message: message});
  }

  changeUserId = (event) => {
    this.setState({user_id: event.target.value});
  };

  changeName = (event) => {
    this.setState({name: event.target.value});
  };

  changeMail = (event) => {
    this.setState({email: event.target.value});
  };

  changePassword = (event) => {
    this.setState({password: event.target.value});
  };

  changeBiography = (event) => {
    this.setState({biography: event.target.value});
  };

  isEmptyInputValue = () => {
    if(!this.state.user_id){
      this.setMessage("Please enter UserId");
      return true;
    }
    if(!this.state.name){
      this.setMessage("Please enter Name");
      return true;
    }
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

  checkInputValue = () => {
    if(this.isEmptyInputValue()){
      return false;
    }
    var appropriateUserId = Validation_ForUserId(this.state.user_id);
    if(!appropriateUserId["isValid"]){
      this.setMessage(appropriateUserId["message"])
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

  // アカウント新規作成処理
  SignUp = () =>{
    if(!this.checkInputValue()){
      return;
    }

    var encryptPass = PublicEncrypt(this.state.password);
    var encryptEmail = PublicEncrypt(this.state.email);

    const json = {user_id: this.state.user_id,
      name: this.state.name,
      email: encryptEmail,
      password: encryptPass,
      biography: this.state.biography};

    postApi("create_user", json)
    .then((return_json)=>{
      if(return_json["result"] === "OK"){
        this.props.history.push('/SignUpSuccess')
      }
      else{
        this.setMessage(return_json["message"]);
      }
    });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={UseStyles.paper}>
          <Avatar className={UseStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            アカウントの新規作成
          </Typography>
          <form className={UseStyles.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  autoComplete={User_Id}
                  variant="outlined"
                  required
                  fullWidth
                  id={User_Id}
                  label="ユーザーID"
                  autoFocus
                  onChange={this.changeUserId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete={Name}
                  variant="outlined"
                  required
                  fullWidth
                  id={Name}
                  label="名前"
                  autoFocus
                  onChange={this.changeName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id={Email}
                  label="メールアドレス"
                  autoComplete={Email}
                  onChange={this.changeMail}
                />
              </Grid>
            ※パスワードの再発行時にのみメールアドレスを使用致します。
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="パスワード"
                  type="password"
                  id={Password}
                  autoComplete={Password}
                  onChange={this.changePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="プロフィール"
                  id={Biography}
                  autoComplete={Biography}
                  onChange={this.changeBiography}
                />
              </Grid>
            </Grid>
            <br/><font color="red">{this.state.message}</font>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={UseStyles.submit}
              onClick={this.SignUp}
            >
              登録
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="./Login" variant="body2">
                  ログイン画面
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
export default SignUp;