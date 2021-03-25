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