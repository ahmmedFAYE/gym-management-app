export interface User{
    userId:string;
    firstName:string;
    lastName:string;
    email:string;
    role:'admin'|'member'|'coach'|'cashier';
    permissions:string[];
    gymId:string;
    avatar?:string;
}

export interface AuthResponse{
    user:User;
    accessToken:string;
    refreshToken:string;
}

export interface LoginCredentials{
    email:string;
    password:string;
}