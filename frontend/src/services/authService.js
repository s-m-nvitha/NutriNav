import api from './api';


export const authService = {


signup: async(userData)=>{

const response =
await api.post(
'/auth/signup',
userData
);

return response.data;

},



login: async(credentials)=>{


const formData =
new URLSearchParams();


formData.append(
"username",
credentials.email
);


formData.append(
"password",
credentials.password
);



const response =
await api.post(
'/auth/login',
formData,
{
headers:{
"Content-Type":
"application/x-www-form-urlencoded"
}
}
);


return response.data;


},



getMe: async()=>{

const response =
await api.get(
'/auth/me'
);

return response.data;

}


};