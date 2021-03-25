import React from 'react';              //Reactを読み込んでいる
import Button from '@material-ui/core/Button';
import {FreeMessage, UseStyles} from '../../utils/utils';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class SignUpSuccess extends React.Component {   //HomeクラスにReact.Componentを継承する

    changePage_ToLogin = (event) => {
        this.props.history.push('/Login')
    }

    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <div className={UseStyles.paper}>
            <Container component="main" maxWidth="xs">
                <center>
                    <Typography component="h1" variant="h5">
                        登録ありがとうございます
                    </Typography>
                    アカウント新規作成完了致しました。<br/>
                    ログイン画面にてログインが可能となります。<br/>
                    <Button 
                    variant="contained"
                    color="primary"
                    onClick={this.changePage_ToLogin} 
                    className={UseStyles.submit}>
                    ログイン画面に戻る
                    </Button>
                    <Box mt={5}>
          　　　　       {FreeMessage}
        　　　　     </Box>
        <marquee bgcolor="green" scrollamount="10" >みつお3郎ってマ？？？</marquee>
               </center>
            </Container>
            </div>
        );
    }
}

export default SignUpSuccess;    