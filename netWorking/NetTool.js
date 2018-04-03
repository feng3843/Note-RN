/**
 * Created by zhuxinhua on 2018/3/20.
 */


async function getDataByRequest(request) {
    try {
        let response = await fetch(request);
        let responseJson = response.json();
        return responseJson;
    }catch (e){

    }

}

async function  postDataByResquest(request,params) {
    try {
        let response = await fetch(request,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(params)
        });
        let responseJson = response.json();
        return responseJson;
    }catch (e){

    }
}

export {getDataByRequest};
export {postDataByResquest};