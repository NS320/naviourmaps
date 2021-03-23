import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getApi, postApi} from '../../utils/Api';

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

    changeNum = (event) => {
      this.setState({number: event.target.value});
    };

    //これが共通をたたくやつだぁ
    testGet = () =>{
      getApi("myappA")
      .then((return_json)=>{
        this.setSoraTest(return_json["sora_test"]);
      });
    }

    //これは共通をたたくやつだぁ
    testPost = () => {
      const test = {message: this.state.message, num: this.state.number};
      
      postApi("myappA", test)
      .then((return_json)=>{
        this.setNumber(return_json["sora_double"]);
      });
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
