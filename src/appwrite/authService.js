import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
        .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));
        this.account = new Account(this.client);
    }

    async signup(email, password, name){
        const userAccount = await this.account.create(ID.unique(), email, password, name)
        if(userAccount){
             return this.login(email,password);
        }else{
            return userAccount;
        }
    }

    async login(email,password){
        const loginUser = await this.account.createEmailSession(email,password);
            return loginUser;
    }
    
    async getCurrentUSer(){
        try {
            return this.account.get()
        } catch (error) {
            return error
        }
        return false
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("LOGOUT ERROR",error)
            return error.message
        }
    }
}

const authSevice = new AuthService();

export default authSevice;