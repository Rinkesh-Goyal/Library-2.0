export default function validateUser(){
    const emailElement = document.querySelector('.email');
    const passwordElement =  document.querySelector('.password');
    const confirmPasswordElement =  document.querySelector('.confirm-password');

    const email = emailElement.value;
    const password = passwordElement.value;
    const confirmPassword =  confirmPasswordElement.value;

    let  signupStatus = true;

    if(email.length === 0){
        document.querySelector('.email-err-msg').style.display = 'block';
        document.querySelector('.email-err-msg').textContent = 'Email is Required.'
        emailElement.value = '';
        signupStatus=false;
    }

    const passRegex = /^[a-zA-Z0-9!@#$%^&*_]{6,16}$/;
    if (!passRegex.test(password)) {
        document.querySelector('.password-err-msg').style.display = 'block';
        document.querySelector('.password-err-msg').textContent = 'Password should be of min length of 6 and max length of 16 and should contains special characters (*,$,#,@,etc) and small and capital letters and should be alpha numeric.';
        passwordElement.value = '';
        signupStatus = false;
      }

      if (!passRegex.test(confirmPassword)) {
        document.querySelector('.c-password-err-msg').style.display = 'block';
        document.querySelector('.c-password-err-msg').textContent = 'Password should be of min length of 6 and max length of 16 and should contains special characters (*,$,#,@,etc) and small and capital letters and should be alpha numeric.';

        confirmPasswordElement.value = '';
        signupStatus = false;
      }

      if(password !== confirmPassword){
        document.querySelector('.c-password-err-msg').style.display = 'block';
          document.querySelector('.c-password-err-msg').textContent = 'Password should be same.';
          confirmPasswordElement.value = '';
          signupStatus = false;
      }

      return signupStatus;
}