export const otpGenerator=()=>
{
    var otp=0;
    otp=Math.ceil(Math.random()*100000)
    return otp;
}