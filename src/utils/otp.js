export function generateOtp(){
    return Math.floor(100000 + Math.random()*900000).toString();
}

export function checkExpired(expiredAt){
    return new Date() > new Date(expiredAt);
}