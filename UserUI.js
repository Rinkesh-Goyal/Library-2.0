import UserData from "./UserData.js";
import validateUser from './UserValidate.js';

export default class UserUI{

    static loadHomePage(){
        UserUI.initLoginSignupButton();
    }

    static initLoginSignupButton(){
        document.querySelector('.signup-btn').addEventListener('click',UserUI.addUser)
    }

    static addUser(){
        document.querySelector('.signup-modal-btn').addEventListener('click', ()=>{
            if(validateUser()){
                console.log('success');
            }
        })
    }

}