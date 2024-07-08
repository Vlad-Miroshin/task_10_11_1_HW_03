import {Fruit} from './classes.js';
import {parser} from './parser.js';
import {known_algo} from './sort_api.js';
import {shuffle} from './sort_api.js';

const sub_btn = document.querySelectorAll(".sub-btn");
const sort_algo = document.querySelector("#sort-algo");

document.addEventListener('DOMContentLoaded', ()=> {
  function onclick(selector, handler) {
      document.querySelector(selector).onclick = handler;
  }

  onclick('#act-shuffle', () => act_shuffle());
  onclick('#act-restore', () => act_restore());
  onclick('#act-filter-apply', () => act_filter_apply());
  onclick('#act-filter-clear', () => act_filter_clear());
  onclick('#act-sort', () => act_sort());
  onclick('#act-add', () => act_add());
  onclick('#act-add-hybrid', () => act_add_hybrid());
  onclick('#act-change-algo', () => act_change_algo());
  
});

sub_btn.forEach((btn)=>{
    btn.addEventListener('click', function(e) {
        toggle_display(this.closest('.item').querySelector('.sub-menu'));
        this.querySelector('.dropdown').classList.toggle('rotate');
    });
});


const known_fruits = await parser("./assets/js/data.json");

let fruits = known_fruits.slice();
let currentAlgoIndex = 0;
let currentAlgo = known_algo[currentAlgoIndex];
let order_of_colors = ['_red', '_orange', '_yellow', '_green', '_cyan', '_blue', '_violet'];

show_currentAlgo();

show_fruits();


// ----------------------------------

function show_fruits() {
  display(fruits);
}

function act_shuffle() {
  shuffle(fruits);
  show_fruits();
}

function act_restore() {
  fruits = known_fruits.slice();
  show_fruits();
}

function act_filter_apply() {
  let min = document.querySelector('#filter_min_val').value.trim();
  let max = document.querySelector('#filter_max_val').value.trim();

  let values = tryGetFilterValues(min, max);
  if (values && values.length > 0) {
    fruits = known_fruits.slice().filter((e) => {
      return e.weight >= values[0] && e.weight <= values[1];
    });
  
    show_fruits();
  }
}

function tryGetFilterValues(raw_min, raw_max) {
  let min = parseInt(raw_min);
  let max = parseInt(raw_max);

  if (raw_min ==='' || raw_max === '') {
    alert('Не указано значение фильтра');
    return;
  }

  if (isNaN(min) || isNaN(max)) {
    alert(`Некорректное значение фильтра: '${raw_min}' - '${raw_max}'`);
    return;
  }

  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }

  return [min, max];
}

function act_filter_clear() {
  act_restore();
}

const comparation = (fruit1, fruit2) => {
  if (fruit1.color === fruit2.color) {
    return fruit1.weight > fruit2.weight;
  } else { 
    let idx1 = order_of_colors.indexOf(getColorClass(fruit1.color));
    let idx2 = order_of_colors.indexOf(getColorClass(fruit2.color));
    return idx1 > idx2;
  }
};

function act_sort() {
  currentAlgo.perform(fruits, comparation);

  show_currentAlgo();
  show_fruits();
}

function act_change_algo() {
  currentAlgoIndex = (currentAlgoIndex + 1) % known_algo.length;
  currentAlgo = known_algo[currentAlgoIndex];
  currentAlgo.reset();

  show_currentAlgo();
}

function show_currentAlgo() {
  if (currentAlgo.isPerformed) {
    sort_algo.innerHTML = `${currentAlgo.name}<br>(~ ${currentAlgo.duration_ms} мс.)`;
  } else {
    sort_algo.innerHTML = currentAlgo.name;
  }
}

function act_add() {
  let raw_kind = document.querySelector('#fruit_kind').value.trim();
  let raw_color = document.querySelector('#fruit_color').value.trim();
  let raw_weight = document.querySelector('#fruit_weight').value.trim();

  let values = tryGetFruitValues(raw_kind, raw_color, raw_weight);

  if (values && values.length > 0) {
    let fru = new Fruit();
    fru.kind = values[0];
    fru.color = values[1];
    fru.weight = values[2];
  
    fruits.push(fru);
    
    show_fruits();
  }
}

function tryGetFruitValues(raw_kind, raw_color, raw_weight) {
  let weight = parseInt(raw_weight);

  if (raw_kind === '') {
    alert('Укажите название фрукта');
    return;
  }

  if (raw_color === '') {
    alert('Укажите цвет фрукта');
    return;
  }

  if (raw_weight === '') {
    alert('Укажите вес фрукта');
    return;
  }

  if (isNaN(weight)) {
    alert(`Некорректный вес: '${raw_weight}'`);
    return;
  }

  if (!getColorClass(raw_color)) {
    alert('Неизвестный цвет');
    return;
  }

  return [raw_kind, raw_color, weight];
}


function act_add_hybrid() {
  let rnd1 = getRandomItem(known_fruits);
  let rnd2 = getRandomItem(known_fruits);

  const hyb = Fruit.CreateHybrid(rnd1, rnd2);

  fruits.push(hyb);

  show_fruits();
}

function getRandomItem(items) {
  return items[Math.round(Math.random() * (items.length - 1))];
}

function display(fruits) {

  const card_list = document.querySelector(".card-list");

  while (card_list.firstChild) {
    card_list.removeChild(card_list.lastChild);
  };

  for (let i = 0; i < fruits.length; i++) {

      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add(getColorClass(fruits[i].color));
      
      const el_index = document.createElement("span");
      el_index.innerHTML = `index: ${i}`;

      const el_kind = document.createElement("span");
      el_kind.innerHTML = `kind: ${fruits[i].kind}`;

      const el_color = document.createElement("span");
      el_color.innerHTML = `color: ${fruits[i].color}`;

      const el_weight = document.createElement("span");
      el_weight.innerHTML = `weight: ${fruits[i].weight}`;

      card.appendChild(el_index);
      card.appendChild(el_kind);
      card.appendChild(el_color);
      card.appendChild(el_weight);

      card_list.appendChild(card);
    }
}

function getColorClass(color) {
  if (color.includes('красн'))
    return '_red';
  else if (color.includes('оранж'))
    return '_orange';
  else if (color.includes('жёлт') || color.includes('желт'))
    return '_yellow';
  else if (color.includes('зелён') || color.includes('зелен'))
    return '_green';
  else if (color.includes('голуб'))
    return '_cyan';
  else if (color.includes('сини'))
    return '_blue';
  else if (color.includes('фиолет'))
    return '_violet';
  else if (color.includes('салат'))
    return '_light_green';
  else if (color.includes('коричн'))
    return '_brown';
  else if (color.includes('бордо'))
    return '_purple';
  else if (color.includes('бежев'))
    return '_beige';
  else
    return undefined;
}

function toggle_display(elem) {
    if (elem.style.display === "" || elem.style.display === "none")
        elem.style.display = 'block';
    else 
        elem.style.display = 'none';
}

