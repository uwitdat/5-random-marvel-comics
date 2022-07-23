export const generateNumbers = ():number[] => {

  const increments = 5;
  const finishingNumber = 500;
  let start = 0;
  const numbers = [];

  while(start <= finishingNumber){
    numbers.push(start);
    start += increments;
  }

  return numbers;
}

