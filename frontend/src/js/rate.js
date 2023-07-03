export const calcRate = (myArray) => {
    const sum = myArray.map(item => item.service_rate).reduce((acc, rate) => acc + rate, 0);
    let averageRate = 0;
    if (myArray.length !== 0) {
      averageRate = sum / myArray.length;
    }
    console.log(`Average rate out of 5: ${averageRate}`);
    return averageRate;
  };