
import {SortAlgo} from './classes.js';

export const known_algo = [
  new SortAlgo('Пузырьковая сортировка', bubbleSort),
  new SortAlgo('Сортировка вставками', insertionSort),
  new SortAlgo('Сортировка выбором', selectionSort) //,
  // new SortAlgo('Сортировка слиянием', mergeSort),
  // new SortAlgo('Быстрая сортировка', quickSort)
];

function bubbleSort(arr, comparation) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (comparation(arr[j], arr[j+1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Меняем значения переменных
        }
      }
    }
  };

  function insertionSort(arr, comparation) {
    // обход массива
    for (let i = 1, l = arr.length; i < l; i++) {
        const current = arr[i];
        let j = i;
 
        // вставка элемента в отсортированную часть
        while (j > 0 && comparation(arr[j - 1], current)) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = current;
    }
 }

 function selectionSort(arr, comparation) {
  // обратите внимание на список инициализаций в цикле
  for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMin = i;
      // поиск минимального элемента в правой части массива
      for (let j = i + 1; j < l; j++) {
          if (comparation(arr[indexMin], arr[j])) {
              indexMin = j;
          }
      }
      // проверка корректности поиска и обмен значениями
      // при обмене используется деструктуризация
      if (indexMin !== i) {
          [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
  }
  return arr;
};



// сам рекурсивный алгоритм слияния
export const mergeSort = arr => {
  // проверяем корректность переданных данных
  if (!arr || !arr.length) {
      return null;
  }

  // если массив содержит один элемент, возвращаем его
  if (arr.length <= 1) {
      return arr;
  }

  // делим массив на две части
  const middle = Math.floor(arr.length / 2);
  const arrLeft = arr.slice(0, middle);
  const arrRight = arr.slice(middle);

  // Для новых массивов снова вызываем сортировку,
  // сливаем их и возвращаем единый массив
  return merge(mergeSort(arrLeft), mergeSort(arrRight));;
};

// алгоритм слияния более мелких частей
const merge = (arrFirst, arrSecond) => {
  const arrSort = [];
  let i = j = 0;

  // сравниваем два массива, сдвигая указатели по очереди
  while (i < arrFirst.length && j < arrSecond.length) {
      arrSort.push(
          (arrFirst[i] < arrSecond[j]) ?
              arrFirst[i++] : arrSecond[j++]
      );
  }
  //возвращаем один отсортированный массив
  return [
      ...arrSort,
      ...arrFirst.slice(i),
      ...arrSecond.slice(j)
  ];
};

// алгоритм быстрой сортировки
export const quickSort = (items, left, right) => {
  var index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
          quickSort(items, left, index - 1);
      }
      if (index < right) {
          quickSort(items, index, right);
      }
  }
  return items;
}

// функция обмена элементов
function swap(items, firstIndex, secondIndex){
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

// функция разделитель
function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (items[i] < pivot) {
          i++;
      }
      while (items[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
}



  // алгоритм перетасовки Фишера-Йейтса
export const shuffle = (arr) => {
  let currentIndex = arr.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}