const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

export const getMyAppA = async () =>{
    const res = await fetch('http://localhost:8000/myAppA/', {
        method: 'GET',
    })
    return await toJson(res);
}

