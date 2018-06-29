"use strict";
function pageSet(){
    generateCaptcha();
    resetSelection();
}
var stateByCountry = {
    USA: ["NY","NJ"],
    Singapore: ["taas","naas"]
}
function makeSubmenu(obj) {
    var value=obj.value;
    var state=obj.id[0]+'stateSelect';
    if(value.length == 0) {
        document.getElementById(state).innerHTML = "<option>state</option>";
    }
    else {
        var statesOptions = "";
        for(var stateId in stateByCountry[value]) {
            statesOptions+="<option>"+stateByCountry[value][stateId]+"</option>";
        }
        document.getElementById(state).innerHTML = statesOptions;
    }
}
var op1,op2,operator;
function generateCaptcha(){
    op1=getRandom(10,100);
    op2=getRandom(10,100);
    operator=getRandom(0,4);
    var arr=["+","-","/","*"];
    var expression=op1+arr[operator]+op2;   
        if(((op1%op2)!==0) || (op2>op1))
        {
            generateCaptcha();
        }
        else{
            document.getElementById("expression").innerHTML=expression;
        }
}
function resetSelection() {
    document.getElementById("ccountrySelect").selectedIndex = 0;
    document.getElementById("cstateSelect").selectedIndex = 0;
    document.getElementById("pcountrySelect").selectedIndex = 0;
    document.getElementById("pstateSelect").selectedIndex = 0;
}
function addressCopy(){
    document.myForm.padd.value=document.myForm.cadd.value;
    document.myForm.pcity.value=document.myForm.ccity.value;
    document.myForm.pzip.value=document.myForm.czip.value;
    document.myForm.pcountry.value=document.myForm.ccountry.value;
    makeSubmenu(document.myForm.pcountry);
    document.myForm.pstate.value=document.myForm.cstate.value;
}
function validateForm(){
    var fname= document.myForm.fname ;
    var mname= document.myForm.mname ;
    var lname= document.myForm.lname ;
    var mail= document.myForm.mail ;
    var phno= document.myForm.phno ;
    var pass= document.myForm.pass ;
    var repass= document.myForm.repass ;
    var dob= document.myForm.dob ;
    var cadd= document.myForm.cadd ;
    var ccity= document.myForm.ccity ;
    var ccountry= document.myForm.ccountry ;
    var czip= document.myForm.czip ;
    var padd= document.myForm.padd ;
    var pcity= document.myForm.pcity ;
    var pcountry= document.myForm.pcountry ;
    var pzip= document.myForm.pzip ;
    var interests= document.myForm.interests ;
    var captcha=document.myForm.result;
var condition = true ;
if(validText(fname)){
    condition = false;
}
if((mname.value.length !== 0) && validText(mname)){
    condition = false;
}
if(validText(lname)){
    condition = false;
}
if(validMail(mail)){
    condition = false;
}
if(validPhNo(phno)){
    condition = false;
}
if(validPass(pass,repass)){
    condition = false;
}
if(validDate(dob)){
    condition = false;
}   
if(validAdd(cadd)){
    condition = false;
}
if(validText(ccity)){
    condition = false;
}
if(validcountry(ccountry)){
    condition = false;
}
if(validZip(czip)){
    condition = false;
}
if(validAdd(padd)){
    condition = false;
}
if(validText(pcity)){
    condition = false;
}
if(validcountry(pcountry)){
    condition = false;
}
if(validZip(pzip)){
    condition = false;
}
if((interests.value.length !== 0) && validText(interests)){
    condition = false;
}
if(checkCaptcha(captcha))
{
 condition=false; 
}
if(condition){
 alert("Submission Successful");
 return true;
}
return condition;
}
function refreshCaptcha()
{
document.getElementById("captchaerror").style.display="none";
document.getElementById("result").value="";
document.getElementById("result").style.border="1px solid #ccc";
generateCaptcha();
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function checkCaptcha(result){
    var answer="";
    if(operator == 0){
        answer= op1 + op2;
    }
    else if(operator == 1){
        answer= op1 - op2;
    }
    else if(operator == 2){
        answer= op1 / op2;
    }
    else{
        answer= op1 * op2;
    }
    if(result.value == answer){
        document.getElementById("captchaerror").style.display="none";
        result.style.border="1px solid rgb(11, 243, 116)";
        return false;
    }
    else{
        result.value="";
        result.style.border="1px solid #ff0000";
        document.getElementById("captchaerror").style.display="block";
        return true;
    }
}
function validText(text){
    var length=text.value.length;
    if(length > 0){
        var patt = /^[a-zA-Z][a-zA-Z\s]+$/;
        if(text.value.match(patt))
        {
        text.style.border="1px solid rgb(11, 243, 116)";
        return false;
        }
        else
        {
        text.style.border="1px solid #ff0000";
        text.value="";      
        if(text.name === "pcity" || text.name === "ccity"){
            text.placeholder = "City name shouldn't contain numbers or symbols !!";
        }
        else if(text.name==="interests"){
            text.placeholder="Intetrsts shouldn't contain numbers or symbols !!";
        }
        else{
            text.placeholder="Name shouldn't contain numbers or symbols !!";
        }
        return true;
        }
    }
    else{
        text.style.border="1px solid #ff0000";     
        if(text.name === "pcity" || text.name === "ccity"){
            text.placeholder = "City cannot be empty !!";
        }  
        else{
            text.placeholder="This field cannot be empty !!";
        }    
        return true;
    }
}
function validAdd(add){
    var length=add.value.length;
    if(length > 0){
        var patt = /^\w[\w\.\/\,\s\(\):-]+$/;
        if(add.value.match(patt))
        {
        add.style.border="1px solid rgb(11, 243, 116)";
        return false;
        }
        else
        {
        add.style.border="1px solid #ff0000";
        add.value="";
        add.placeholder = "Address should contain only letters,numbers,:,/,.,(),- or ','";       
        return true;
        }
    }
    else{
        add.style.border="1px solid #ff0000";
        add.placeholder = "Address cannot be empty !!";       
        return true;
    }
}
function validMail(mail){
    var length=mail.value.length;
    if(length > 0){
        var patt = /^(\w[\w_.]+)@(\S)+\.([a-zA-Z]+)$/;
        if(mail.value.match(patt))
        {
        mail.style.border="1px solid rgb(11, 243, 116)";
        return false;
        }
        else
        {
        mail.style.border="1px solid #ff0000";
        mail.value="";
        mail.placeholder = "Please Enter A Valid e-mail";
        return true;
        }
    }
    else{
        mail.style.border="1px solid #ff0000";
        mail.placeholder = "This field cannot be empty !!";
        return true;
    }
}
function validPhNo(number){
        var length=number.value.length;
    if(length > 0){
        var numbers = /^[0-9]+$/;
        if(number.value.match(numbers)&& length===10)
        {
        number.style.border="1px solid rgb(11, 243, 116)";
        return false;
        }
        else
        {
        number.style.border="1px solid #ff0000";
        number.value="";
        number.placeholder = "phone no. should be 10 digits";
        return true;
        }
    }
    else{
        number.style.border="1px solid #ff0000";
        number.placeholder = "This field cannot be empty !!";
        return true;
    }
}
function validZip(number){
    var length=number.value.length;
    if(length > 0){
        var numbers = /^[0-9]+$/;
        var zero=/0{6}/;
        if(number.value.match(numbers) && !(zero.test(number.value)) && length===6)
        {
        number.style.border="1px solid rgb(11, 243, 116)";
        return false;
        }
        else
        {
        number.style.border="1px solid #ff0000";
        number.value="";
        number.placeholder = "Zip code should be 6 digits and Not 6 0's";
        return true;
        }
    }
    else{
        number.style.border="1px solid #ff0000";
        number.placeholder = "Zip code cannot be empty !!";
        return true;
    }    
}
function validcountry(country){
    var id=country.id[0]+'countryerror';
    if(country.value.length === 0){
        document.getElementById(id).innerHTML="*Country & State cannot be empty!!";
        document.getElementById(id).style.display="block";
        return true;
    }
    else{
        document.getElementById(id).innerHTML="";
        document.getElementById(id).value="";
        return false;
    }
}
function validPass(pass,repass){
    if(pass.value.length === 0 || repass.value.length === 0){
        if(pass.value.length === 0){
            pass.style.border="1px solid #ff0000";
            pass.placeholder = "This field cannot be empty !!";
        }
        if(repass.value.length === 0){
            repass.style.border="1px solid #ff0000";
            repass.placeholder = "This field cannot be empty !!";
        }
        return true;
    }
    else if(pass.value != repass.value){
        pass.value="";
        repass.value="";
        pass.style.border="1px solid #ff0000";
        pass.placeholder = "Passwords do not match !!";
        repass.style.border="1px solid #ff0000";
        repass.placeholder = "Passwords do not match !! !!";
        return true;
    }
    else{
        pass.style.border="1px solid rgb(11, 243, 116)";
        repass.style.border="1px solid rgb(11, 243, 116)";
        return false;
    }
}
function validDate(date){
    if(date.value){
        var today = new Date();
        var day = today.getDate();
        var mon = today.getMonth()+1;
        var year = today.getFullYear();
        if(day<10){
                day="0"+day;
            } 
            if(mon<10){
                mon="0"+mon;
            }        
        today = year+"-"+mon+"-"+day;
        if( date.value >= today){
            date.style.border="1px solid #ff0000";
            document.getElementById("dateerror").innerHTML="*can't be future date!!";
            document.getElementById("dateerror").style.display="block";
            return true;
        } 
        else{
            date.style.border="1px solid rgb(11, 243, 116)";
            document.getElementById("dateerror").style.display="none";
            return false;
        }
    }
    else{
        date.style.border="1px solid #ff0000";
        document.getElementById("dateerror").innerHTML="*put date of birth!!";
        document.getElementById("dateerror").style.display="block";
        return true;       
    }    
}
