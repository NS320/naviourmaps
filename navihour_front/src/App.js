import React from 'react'; //Reactを読み込んでいる
//画面遷移で使用する{ BrowserRouter, Route, Switch }を'react-router-dom'から読み込んでいる
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './views/components/Login'; //作成したLogin.jsを読み込んでいる
import SignUp from './views/components/SignUp'; //作成したSignUp.jsを読み込んでいる
import ResetPassword from './views/components/ResetPassword'; //作成したResetPassword.jsを読み込んでいる
import Home from './views/components/Home'; //作成したHome.jsを読み込んでいる
import EditUser from './views/components/EditUser'; //作成したHome.jsを読み込んでいる
import SignUpSuccess from './views/components/SignUpSuccess'; //作成したSignUpSuccess.jsを読み込んでいる
import NewAddress from './views/components/NewAddress';
import { postApi } from './utils/Api';

import EditPassword from './views/components/EditPassword';

class App extends React.Component {
  constructor(props){
    super(props)
    this.App_SetUserId = this.App_SetUserId.bind(this); // 関数をpropsで持つ
    this.App_SetBiography = this.App_SetBiography.bind(this); // 関数をpropsで持つ
    this.App_SetIsLogin = this.App_SetIsLogin.bind(this); // 関数をpropsで持つ
    this.state = {
      name: '',
      email: '',
      biography: ''
    }
  }

  // user_id：ユーザーID
  App_SetUserId(user_id){
    localStorage.setItem("user_id",user_id); // F5でデータを失わないようにする対応 setItem(key,value)
  }

  // biography：自己紹介
  App_SetBiography(biography){
    localStorage.setItem("biography",biography); // F5でデータを失わないようにする対応 setItem(key,value)
  }

  // isLogin：ログイン情報（True or False）
  App_SetIsLogin(isLogin){
    localStorage.setItem("isLogin",isLogin); // F5でデータを失わないようにする対応 setItem(key,value)
  }

  getUser = (user_id) => {
    const json = {
      user_id: user_id,
    };
    postApi("get_user", json)
    .then((return_json) => {
      this.setState({ 
          name: return_json["name"],
          email: return_json["email"],
          biography: return_json["biography"],
      });
    });
  }

  returnLogin = () => {
    return (<Login 
      App_SetUserId = {this.App_SetUserId} // Login.jsで使用可能（this.props.App_SetUserId）
      App_SetBiography = {this.App_SetBiography} // Login.jsで使用可能（this.props.App_SetBiography）
      App_SetIsLogin = {this.App_SetIsLogin} // Login.jsで使用可能（this.props.App_SetIsLogin）
    />)
  }

  returnHome = () => {
    return (<Home 
      App_UserId = {localStorage.getItem("user_id")} // Home.jsで使用可能（this.props.App_UserId）
      App_Biography = {localStorage.getItem("biography")} // Home.jsで使用可能（this.props.App_Biography）
      App_IsLogin = {localStorage.getItem("isLogin")} // Home.jsで使用可能（this.props.App_IsLogin）
      App_SetIsLogin = {this.App_SetIsLogin}
    />)
  }

  // isLoginがString型で保存しているみたいなのでBool型に変更する。
  toBoolean = (bool) => {
    if (bool === null){
      return false
    }
    else {
      return bool.toLowerCase() === "true";
    }
  }

  componentDidMount(){
    this.getUser(localStorage.getItem("user_id"));
  }

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/Login" 
            render={() => <Login 
              App_SetUserId = {this.App_SetUserId} // Login.jsで使用可能（this.props.App_SetUserId）
              App_SetBiography = {this.App_SetBiography} // Login.jsで使用可能（this.props.App_SetBiography）
              App_SetIsLogin = {this.App_SetIsLogin} // Login.jsで使用可能（this.props.App_SetIsLogin）
              />}/> 
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/SignUpSuccess" component={SignUpSuccess} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/Home" 
            render={() => {
              return(this.toBoolean(localStorage.getItem("isLogin")) ?
                this.returnHome()
                :
                this.returnLogin()
              )
            }}/>
          <Route exact path="/EditUser" 
            render={() => {
                return(this.toBoolean(localStorage.getItem("isLogin")) ?
                  <EditUser
                  App_UserId = {localStorage.getItem("user_id")}
                  Name = {this.state.name}
                  Email = {this.state.email}
                  Biography = {localStorage.getItem("biography")}
                  />
                  :
                  this.returnLogin()
                )
              }}/>
          <Route exact path="/NewAddress" 
              render={() => {
                return(this.toBoolean(localStorage.getItem("isLogin")) ?
                <NewAddress 
                  App_UserId = {localStorage.getItem("user_id")} // Home.jsで使用可能（this.props.App_UserId）
                />
                :
                this.returnLogin()
              )
              }}/>
          <Route exact 
            render={() => {
              return(this.toBoolean(localStorage.getItem("isLogin")) ?
              this.returnHome()
              :
              this.returnLogin()
            )
            }}/> 
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;