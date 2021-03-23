import React from 'react';              //Reactを読み込んでいる
import { Link } from 'react-router-dom';//　追加　Linkタブを読み込む

class Test2 extends React.Component {   //page2クラスにReact.Componentを継承する

    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <div>
                HelloTest2!!!<br/>
                <Link to={`/`}>Go To Test1</Link>  //追加　Go To Test1をクリックするとhttp://localhost:3000/Test1に遷移する
            </div>
        );
    }
}

export default Test2;                   //page2を出力する為に必要