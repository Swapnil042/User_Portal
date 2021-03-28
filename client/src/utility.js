export const checkSignUpInput = (fields)=>{
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let emailError = null

    if(!emailPattern.test(fields.email) || fields.email === ''){
        emailError = "Invalid Email";
    }
    let firstNameError = null;
    if(!fields.first_name.trim().length){
        firstNameError = "Invalid Name";
    }
    let lastNameError = null;
    if(!fields.last_name.trim().length){
        lastNameError = "Invalid Name";
    }
    let passError = null;
    if(fields.password.length < 7){
        passError = "At least 7 character";
    }
    let addressError = null;
    if(!fields.address.trim().length){
        addressError="Invalid";
    }
    let birthError = null;
    let final_date = null;
    if(fields.birth_date === null){
        birthError="Invalid";
    }else{
        let year = fields.birth_date.getFullYear().toString();
        let month = (fields.birth_date.getMonth() + 1).toString();
        let day = fields.birth_date.getDate().toString();
        (day.length === 1) && (day = '0' + day);
        (month.length === 1) && (month = '0' + month);

        final_date = year+'-'+month+'-'+day;
    }
    const phonePattern = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    let phoneError = null;
    if(!phonePattern.test(fields.phone)){
        phoneError = "Invalid !! Check again !! No space is allowed !!"
    }
    let isValid = true;
    if(firstNameError|| lastNameError|| passError ||emailError || addressError || birthError || phoneError){
        isValid = false;
    }
    return{ isValid, firstNameError, lastNameError, passError, emailError, addressError, birthError,final_date, phoneError }
}

export const checkLoginInput = (fields)=>{
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let emailError = null;

    if(!emailPattern.test(fields.email) || fields.email === ''){
        emailError = "Invalid Email";
    }

    let passError = null;
    if(!fields.password.trim().length){
        passError = "Can not be empty";
    }
    
    let isValid = true;
    if(passError ||emailError){
        isValid = false;
    }
    return{ isValid,passError, emailError }
}
export const checkPassChange = (fields)=>{
    let curPassError = null;
    if(fields.currentPass.length < 7){
        curPassError = "At least 7 character";
    }
    let newPassError = null;
    if(fields.newPassword.length < 7){
        newPassError = "At least 7 character";
    }
    let confirmPassError = null;
    if(fields.confirmNewPass.length < 7){
        confirmPassError = "At least 7 character";
    }else if(fields.newPassword !== fields.confirmNewPass){
        confirmPassError = "Doesn't Match";
    }
    let isValid = true;
    if(curPassError || newPassError || confirmPassError ){
        isValid = false;
    }
    return{ isValid, curPassError, newPassError, confirmPassError}
}