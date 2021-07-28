// import UI from './UI.js';
import UserUI from './UserUi.js';

// document.addEventListener('DOMContentLoaded',UI.loadHomePage);
document.addEventListener('DOMContentLoaded',UserUI.loadHomePage);
// document.addEventListener('DOMContentLoaded', ()=>{
//     if (UserStorage.getPreviousUser() !== null) {
//         const user = UserStorage.findUserFromStorage(UserStorage.getPreviousUser());
//         UserUI.loadUserPage(UserStorage.getPreviousUser());
//         UserUI.loadBooks(user);
//         UserUI.initSort();
//     }
//     else {
//         UserUI.initLoginSignupButton();
//         UserUI.initSort();
//     }
// })

// window.onload((event) => {
    
// })