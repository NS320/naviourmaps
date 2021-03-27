import React from 'react'; //Reactを読み込んでいる
//画面遷移で使用する{ BrowserRouter, Route, Switch }を'react-router-dom'から読み込んでいる
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test1 from './views/components/Test1'; //作成したTest1.jsを読み込んでいる
import Test2 from './views/components/Test2'; //作成したTest2.jsを読み込んでいる
import TestApi from './views/components/TestApi'; 
import Login from './views/components/Login'; //作成したLogin.jsを読み込んでいる
import SignUp from './views/components/SignUp'; //作成したSignUp.jsを読み込んでいる
import ResetPassword from './views/components/ResetPassword'; //作成したResetPassword.jsを読み込んでいる
import Home from './views/components/Home'; //作成したHome.jsを読み込んでいる
import SignUpSuccess from './views/components/SignUpSuccess'; //作成したSignUpSuccess.jsを読み込んでいる
import PropTypes from 'prop-types';
import NewAddress from './views/components/NewAddress';

class App extends React.Component {
  constructor(props){
    super(props)
    this.App_SetUserId = this.App_SetUserId.bind(this); // 関数をpropsで持つ
    this.App_SetBiography = this.App_SetBiography.bind(this); // 関数をpropsで持つ
    this.App_SetIsLogin = this.App_SetIsLogin.bind(this); // 関数をpropsで持つ
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
            render={() => <Home 
              App_UserId = {localStorage.getItem("user_id")} // Home.jsで使用可能（this.props.App_UserId）
              App_Biography = {localStorage.getItem("biography")} // Home.jsで使用可能（this.props.App_Biography）
              App_IsLogin = {localStorage.getItem("isLogin")} // Home.jsで使用可能（this.props.App_IsLogin）
              />}/>
          <Route exact path="/" component={Test1} />
          <Route exact path="/Test2" component={Test2} />
          <Route exact path="/TestApi" component={TestApi} />
          <Route exact path="/NewAddress" component={NewAddress} />
          <Route exact component={Login} /> /*存在しないURLの場合、Login画面に行く TODO ログインできる状態ならば、Homeに行く*/
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;