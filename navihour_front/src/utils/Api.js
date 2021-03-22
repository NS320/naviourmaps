const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

//間違ってそう！
export const getMyAppA = async () =>{
    const res = await fetch('http://localhost:8000/myAppA/', {
        method: 'GET',
    })
    return await toJson(res);
}

export const postAPI = async (parms, appName) =>{
    const res = await fetch('http://localhost:8000/' + appName + '/', {
        method: rest,
    })
    return await toJson(res);
}

export const restAPI = async (rest, appName) =>{
    const res = await fetch('http://localhost:8000/' + appName + '/', {
        method: rest,
    })
    return await toJson(res);
}
