function calculateValidationNumber(input) {
  let numbers = input.split('');
  let iterate = true;
  while (iterate) {
    let resultItem = 0;
    numbers.forEach((ctr) => {
      resultItem += parseInt(ctr);
    });

    if (resultItem.toString().split('').length < 2) {
      return resultItem;
    } else {
      numbers = resultItem.toString().split('');
    }
  }
}

console.log('Calculated Validation Number: ', calculateValidationNumber('444444'));