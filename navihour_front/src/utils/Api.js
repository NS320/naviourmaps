/**
 * =====================GET===========================
 * input: 
 *      API名(今回はアプリ)
 *      ex)appName: "Get_All_Address"
 * 
 * output:
 *      サーバが返すjson
 *       ex)
 *       return:
 *       {
 *       "Result": "OK",
 *       "Message": "success login",
 *       "UserName": "Mituso",
 *       "UserId": "xxxxxxxxxx",
 *       "Bio": "3 ROU, TAKU ROU"
 *       }
 *  
 * how to use:
 *   ☆getApiを使った後に、thenを使う☆
 *  
 *    testGet = () =>{
 *      getApi("myappA")
 *      .then((return_json)=>{
 *        //ここに処理を書く
 *        this.setSoraTest(return_json["sora_test"]);
 *      });
 *    }
 * ===================================================
 */
export const getApi = async (appName) =>{
    return await fetch('http://localhost:8000/mappapp' + appName)
    .then((res)=>{
        return( res.json() );
    })
    .then((json) =>{
        console.log(json)
        return json;
    });
}

/**
 * =====================POST===========================
 * input: 
 *      API名(今回はアプリ)
 *      ex)appName: "Login"
 *       jsonData: {
 *       "Mail": "mitsuo@gmail.com",
 *       "Password": "xvxvxvxvxvxvxvx",
 *       }
 *  
 * output:
 *      サーバが返すjson
 *       ex)
 *       return: 
 *       {
 *       "Result": "OK",
 *       "Message": "success login",
 *       "UserName": "Mituso",
 *       "UserId": "xxxxxxxxxx",
 *       "Bio": "3 ROU, TAKU ROU",
 *       }
 *  
 * how to use:
 *  ☆postApiを使った後に、thenを使う☆
 *  
 *  testPost = () => {
 *    const test = {message: this.state.message, num: this.state.number};
 *   
 *    postApi("myappA", test)
 *    .then((return_json)=>{
 *      //ここに処理を書く
 *      this.setNumber(return_json["sora_double"]);
 *    });
 *  }
 * ===================================================
 */
export const postApi = async (appName, jsonData) =>{
    const param  = {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify(jsonData)
    };
    return await fetch('http://localhost:8000/mapapp/' + appName, param)
    .then((res)=>{
        return( res.json() );
    })
    .then((json)=>{
        console.log(json)
        return json;
    });
}
