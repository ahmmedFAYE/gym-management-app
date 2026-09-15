export interface User {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    role:'superadmin'|'admin'|'coach'|'member'|'cashier';
    avatar?:string;
    userId:string;
    gymId:string;
    permissions:string [];
}

export interface AuthReponse{
    user:User;
    accessToken:string;
    refreshToken:string;
}

export interface AuthCredentials{
    email:string;
    password:string;
}