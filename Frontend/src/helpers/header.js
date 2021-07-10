
export function apiHeader() {
  let user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`));
  if(user && user.accessToken){
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+user.accessToken
    };
  }else{
    return { 'Content-Type': 'application/json' };
  }
}

export function apiHeaderFormData(){
  let user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`));
  if(user && user.accessToken){
    return {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer '+user.accessToken
    };
  }else{
    return { 'Content-Type': 'application/json' };
  }
}
