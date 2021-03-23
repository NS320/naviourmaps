import React from 'react';              //Reactを読み込んでいる
import { Link, Router, Route } from 'react-router-dom';//　追加　Linkタブを読み込む
import Address from './Address'
import Profile from './Profile'

class Home extends React.Component {   //HomeクラスにReact.Componentを継承する

    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <div>
                Home<br/>
                <Link to={`/Test2`}>Go To Test2</Link>
            </div>
        );
    }
}

export default Home;                   //Homeを出力する為に必要