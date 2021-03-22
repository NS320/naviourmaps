import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import restAPI from '../../utils/Api';

class TestApi extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          message: 'before_test_message',
          number: 2,
          sora_test: 'before_test'
        }
    }

    setMessage = (message) => {
      this.setState({message: message});
    }

    setNumber = (number) => {
      this.setState({number: Number(number)});
    }

    setSoraTest = (soratest) => {
      this.setState({sora_test: soratest});
    }

    testMyAppAGet = async (appName) =>{
      await fetch('http://localhost:8000/' + appName + '/')
      .then((res)=>{
        console.log(res)
        return( res.json() );
      })
      .then((json)=>{
        console.log(json);
        this.setMessage(json["message"]);
        this.setSoraTest(json["sora_test"]);
        return json;
      });
    }

    testGet = () => {
      this.testMyAppAGet("myappA")
    }

    testMyAppAPost = async (appName, param) =>{
      console.log("testMyAppAPost parms");
      console.log(param);
      await fetch('http://localhost:8000/' + appName + '/', param)
      .then((res)=>{
        console.log(res)
        return( res.json() );
      })
      .then((json)=>{
        console.log(json);
        this.setNumber(json["sora_double"]);
        return json;
      });
    }

    testPost = () => {
      const test = {message: this.state.message, num: this.state.number};
      console.log(test);
      const param  = {
        method: "POST",
        // リクエストボディ
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(test)
      };
      console.log("parms");
      console.log(param);
      this.testMyAppAPost("myappA", param);
    }

    changeNum = (event) => {
      this.setState({number: event.target.value});
    };

    componentDidMount = () => {
    }

    render(){
        return (
          <div className="container">
            <TextField
              id="number_form"
              type="number"
              value={this.state.number}
              onChange={this.changeNum}
            />
            <Button onClick={this.testPost} >SORA POST ボタン</Button>
            <p>{this.state.sora_test}</p>
            <Button onClick={this.testGet} >SORA GET ボタン</Button>
          </div>
        )
    }

}
export default TestApi;
