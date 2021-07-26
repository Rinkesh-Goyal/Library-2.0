import UserData from "./UserData.js";
import validateUser from './UserValidate.js';
import UserStorage from './UserStorage.js';

export default class UserUI {

    static loadHomePage() {
        UserUI.initLoginSignupButton();
    }

    static initLoginSignupButton() {
        document.querySelector('.signup-btn').addEventListener('click', ()=>{
            document.querySelectorAll('.err-msg').forEach((msg) => {
                msg.style.display = 'none'
            })
            UserUI.addUser();
        })
        document.querySelector('.login-btn').addEventListener('click', ()=>{
            document.querySelectorAll('.login-err-msg').forEach((msg) => {
                msg.style.display = 'none'
            })
            UserUI.getUser();
        })
    }

    static addUser() {
        document.querySelector('.signup-modal-btn').addEventListener('click', () => {
            if(UserStorage.getUsers().contains(UserUI.getUserData().email)){
                alert('User already exist.');
                UserUI.clearSignUpForm();
            }
            if (validateUser()) {
                document.querySelector('.signup-modal-btn').setAttribute('data-bs-dismiss', 'modal');
                document.querySelectorAll('.err-msg').forEach((msg) => {
                    msg.style.display = 'none'
                })
                const userData = new UserData(UserUI.getUserData().email, UserUI.getUserData().password);
                UserStorage.addUserToStorage(userData);
                UserUI.clearSignUpForm();
            }
        })
    }

    static clearSignUpForm() {
        document.querySelector('.email').value = '';
        document.querySelector('.password').value = '';
        document.querySelector('.confirm-password').value = '';

        document.querySelector('err-msg').style.display = 'none';
    }

    static getUserData() {
        const emailElement = document.querySelector('.email');
        const passwordElement = document.querySelector('.password');

        const email = emailElement.value;
        const password = passwordElement.value;

        return { email, password };
    }


    static verifyUser() {
        const emailElement = document.querySelector('.login-email');
        const passwordElement = document.querySelector('.login-password');

        const email = emailElement.value;
        const password = passwordElement.value;

        let loginStatus = true;

        if (email.length === 0) {
            document.querySelector('.login-email-err-msg').style.display = 'block';
            document.querySelector('.login-email-err-msg').textContent = 'Email is Required.'
            emailElement.value = '';
            loginStatus = false;
        }

        const passRegex = /^[a-zA-Z0-9!@#$%^&*_]{6,16}$/;
        if (!passRegex.test(password)) {
            document.querySelector('.login-password-err-msg').style.display = 'block';
            document.querySelector('.login-password-err-msg').textContent = 'Password should be of min length of 6 and max length of 16 and should contains special characters (*,$,#,@,etc) and small and capital letters and should be alpha numeric.';
            passwordElement.value = '';
            loginStatus = false;
        }

        return loginStatus;
    }

    static getUser() {

        document.querySelector('.login-modal-btn').addEventListener('click', () => {
            const emailElement = document.querySelector('.login-email');
            const passwordElement = document.querySelector('.login-password');

            const email = emailElement.value;
            const password = passwordElement.value;
            if (UserUI.verifyUser()) {
                const user = UserStorage.findUserFromStorage(email);
                if (user.password === password) {
                    console.log(user);
                    UserUI.clearLoginForm();
                    document.querySelector('.login-modal-btn').setAttribute('data-bs-dismiss', 'modal');
                    document.querySelectorAll('.login-err-msg').forEach((msg) => {
                        msg.style.display = 'none'
                    })
                } else {
                    alert('Password or Email is incorrect.');
                    UserUI.clearLoginForm();
                }
            }
        })


    }

    static clearLoginForm() {
        document.querySelector('.login-email').value = '';
        document.querySelector('.login-password').value = '';
        document.querySelector('.login-err-msg').style.display = 'none';
    }
}