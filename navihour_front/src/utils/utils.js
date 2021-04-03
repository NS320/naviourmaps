import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

/*
* UserTableに設定されているカラム名
*/
export const User_Id = "user_id";
export const Name = "name";
export const Email = "email";
export const Password = "password";
export const Biography = "biography";
export const Is_logon = "is_logon";
export const Created_time = "created_time";
export const Updated_time = "updated_time";
/*
* AddressTableに設定されているカラム名
*/
//export const User_Id = "user_id"; // UserTableと共有
export const Address_id = "address_id";
export const Address = "address";
export const Address_name = "address_name";
export const Is_favorite = "is_favorite";
export const Is_private = "is_private";
export const Address_Created_time = "address_created_time";
export const Address_Updated_time = "address_updated_time";
/*
* Apiを使用した場合のReturn_Jsonに必ず含まれているKey名
*/
export const Result = "result";
export const OK = "OK";
export const NG = "NG";
export const Message = "massage";

export const FreeMessage = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
        nmProject ver1.0.0
    </Typography>
  );
}

export const UseStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/*
* Htmlのエスケープ処理
*/
export const EscapeHtml = (str) => {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  return str;
}

/* 
* パスワードの入力値チェック
* [入力値チェック基準]
* 　・8文字以上16文字以下
* 　・数字が1つでも含まれていること
* 　・英字が1つでも含まれていること
*/
export const Validation_ForPassword = (password) => {
  var regex = new RegExp(/^\w{8,16}$/); // 8文字以上16文字以下の英数字
  if(!regex.test(password)){
    return {isValid:false, message:"パスワードは8文字以上16文字以下の英数字で入力してください"};
  }
  var number = new RegExp(/[0-9]/); // 数字が1つでも含まれている
  if(!number.test(password)){
    return {isValid:false, message:"パスワードは数字を少なくとも1文字含んでください"};
  }
  var alphabet = new RegExp(/[a-zA-Z]/); // 英字が1つでも含まれている
  if(!alphabet.test(password)){
    return {isValid:false, message:"パスワードは英字を少なくとも1文字含んでください"};
  }
  return {isValid:true, message:null};
}

/*
* メールアドレスの入力値チェック
* [入力値チェック基準]
* 　・先頭の1文字：アルファベット小文字/大文字/数字を許可 ^[A-Za-z0-9]{1}
* 　・2文字目以降から「@」まで：アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを許可 [A-Za-z0-9_.-]*
* 　・「@」は連続しない：@{1}
* 　・「@」以降からトップドメインまで：アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを許可 1文字以上 [A-Za-z0-9_.-]{1,}
* 　・トップレベルドメイン：アルファベット小文字/大文字/数字を許可 1文字以上 \.[A-Za-z0-9]{1,}$
*/
export const Validation_ForEmail = (email) => {
  var regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!regex.test(email)) {
    return {isValid:false, message:"メールアドレスの形式が間違っています"};
  }
  return {isValid:true, message:null};
}

/*
* ユーザーIDの入力値チェック
* [入力値チェック基準]
* 　・アルファベット小文字/大文字/数字/アンダースコアを許可 1文字以上
*/
export const Validation_ForUserId = (user_id) => {
  var regex = /[A-Za-z0-9_]{1,}/
  if (!regex.test(user_id)) {
    return {isValid:false, message:"ユーザーIDは英数字と「_」以外使用できません"};
  }
  return {isValid:true, message:null};
}