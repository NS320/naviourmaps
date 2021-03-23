import React from 'react';              //Reactを読み込んでいる
import { Link } from 'react-router-dom';//　追加　Linkタブを読み込む

class Address extends React.Component {   //HomeクラスにReact.Componentを継承する

    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <div>
                Address<br/>
            </div>
        );
    }
}

export default Address;                   //Homeを出力する為に必要