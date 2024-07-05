export const bubbleSort = (arr, comparation) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (comparation(arr[j], arr[j+1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Меняем значения переменных
        }
      }
    }
  };