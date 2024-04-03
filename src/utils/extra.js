class Extra {
    randomNumber(){
        let randomNumber = Math.random();
       return  randomNumber.split('.')[1];
    }
}
module.exports = Extra;