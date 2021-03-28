//If someone enters name like "     sheIkh  swApniL     ", then this prepareName function
//will formate it like "Sheikh Swapnil"
const prepareName = (name)=>{
    const before = name.trim()
                .toLowerCase().split(' ')
                .map((value)=> {
                    if(value !== '') 
                        return value[0].toUpperCase() + value.slice(1, value.length)
                    }
                );
    let final = '';
    before.forEach((value)=>{
        if(value){
            final += ' '+value
        }
    });
    return final.trim();
}

const checkEmail = (email)=>{
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailPattern.test( email );
}

module.exports = {
    prepareName,
    checkEmail 
}