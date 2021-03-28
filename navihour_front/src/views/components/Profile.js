import React from 'react';              //Reactを読み込んでいる

class Profile extends React.Component {   //HomeクラスにReact.Componentを継承する

    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <div>
                Profile<br/>
            </div>
        );
    }
}

export default Profile;                   //Homeを出力する為に必要