
var length = 15;
 
function countdown(that) {
    //console.log('count down'+that.seconds);
    var seconds = that.seconds;
    //console.log(seconds);
    var captchaLabel = that.captchaLabel;
    if (seconds < 1) {
        captchaLabel = '获取验证码';
        seconds = length;
        that.captchaDisable = false;
 
    } else {
        captchaLabel = --seconds + '秒后重新发送'
    }
    that.seconds = seconds;
    that.captchaLabel = captchaLabel;
 
}
 
module.exports = {
    countdown: countdown,
    length: length

}