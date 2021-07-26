import Library from './Library.js'
export default class UserData{
        
    dateAdded;

constructor(email, password){
    this.email = email;
    this.password = password;
    this.dateAdded = new Date();
    this.library  = new Library();
}   


getEmail(){
    return this.email;
}

setEmail(email){
    this.email=email;
}

getPassword(){
    return this.password;
}

stePassword(password){
    this.password = password;
}


getDate(){
    return this.dateAdded;
}

getLibrary(){
    return this.library;
}
}