async function apiRest(url,objetoPost,set) {
  var headers =   new Headers();
  var data    =   new FormData();
  let arrays  =   Object.entries(objetoPost);
  arrays.map(([key,value])=>{
    data.append (key, value);
    return value;
  });
  let cabecera  =   { headers:headers,
                      method: "POST",
                      body: data,
  }
  fetch(url,cabecera)
    .then(res => res.json())
    .then((result) => {

    switch(set.store){
      case "Key":
        set.content.setItem(set.store, result.response.Key);
      break;
      case "User":
        if(result.response.code===203){
          set.callback(result.response.message);
        }else if(result.response.code===200){
          set.content.setItem(set.store, JSON.stringify(result.response.data));
          set.before();
        }
      break;
      case "Citas":
        if(result.response.code===203){
          set.callback(result.response.message);
        }else if(result.response.code===200){
          set.content.setItem(set.store, JSON.stringify(result.response.data));
          set.before(result.response.message);
        }
      break;
      case "ListarMisCitas":
        if(result.response.code===203){
          set.callback(result.response.message);
        }else if(result.response.code===200){
          set.content.setItem(set.store, JSON.stringify(result.response.data));
          set.preRender(result.response.data);
        }
      break;
      default:
        if(JSON.stringify(result.response.data)){
          set.content.setItem(set.store, JSON.stringify(result.response.data));
          //set.before();
        }
      break;
    }
  }).catch(error => {
    console.log(error)
  });
}

export {
  apiRest,
};
