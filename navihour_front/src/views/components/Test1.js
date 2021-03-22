import React from 'react';              //Reactを読み込んでいる
import { Link } from 'react-router-dom';//　追加　Linkタブを読み込む

class Test1 extends React.Component {   //page1クラスにReact.Componentを継承する

    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <div>
                HelloTest1!!!<br/>
                <Link to={`/Test2`}>Go To Test2</Link>  //追加　Go To Test2をクリックするとhttp://localhost:3000/Test2に遷移する
            </div>
        );
    }
}

export default Test1;                   //page1を出力する為に必要