import React from 'react';              //Reactを読み込んでいる
import Button from '@material-ui/core/Button';
import {FreeMessage, UseStyles} from '../../utils/utils';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class ResetPasswordSuccess extends React.Component {   //HomeクラスにReact.Componentを継承する

    changePage_ToLogin = (event) => {
        this.props.history.push('/Login')
    }

    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <Container component="main" maxWidth="xs">
                <div className={UseStyles.paper}>
                    <center>
                        <Typography component="h1" variant="h5">
                            メールを送信いたしました。
                        </Typography>
                        メール内に記述されるパスワードを使用して、ログインしてください<br/>
                        <Button 
                        variant="contained"
                        color="primary"
                        onClick={this.changePage_ToLogin} 
                        className={UseStyles.submit}>
                        ログイン画面に戻る
                        </Button>
                    </center>
               </div>
               <Box mt={5}>
                    <FreeMessage />
        　　　　</Box>
            </Container>
        );
    }
}

export default ResetPasswordSuccess;    