
export function apiHeader() {
  let user = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`);
  let accessToken = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_TOKEN`);
  if(user && accessToken){
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+accessToken
    };
  }else{
    return { 'Content-Type': 'application/json' };
  }
}

export function apiHeaderFormData(){
  let user = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`);
  let accessToken = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_TOKEN`);
  if(user && accessToken){
    return {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer '+accessToken
    };
  }else{
    return { 'Content-Type': 'application/json' };
  }
}
