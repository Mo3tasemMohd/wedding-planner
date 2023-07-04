export const calcRatesPercent = (myArray) => {
  const dict = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  myArray.forEach((obj) => {
    const rate = obj.customersNum;
    if (rate >= 1 && rate <= 5) {
      dict[obj.service_rate]+=rate;
    }
  });
  const sum = Object.values(dict).reduce((acc, curr) => acc + curr, 0);
  if (sum > 0) {
    for (const key in dict) {
      dict[key] /= sum;
      dict[key] *= 100;
    }
  }
  return dict;
}; 


export const nRates = (arr) => {
  let sum = 0;
  arr.forEach((obj) => {
    sum += obj.customersNum;
  });
  return sum;
}; 

export const calculateAverageRate = (arr) => {
  let weightedSum = 0;
  let totalCustomers = 0;
  arr.forEach((obj) => {
    weightedSum += obj.service_rate * obj.customersNum;
    totalCustomers += obj.customersNum;
  });
  return weightedSum / totalCustomers;
}