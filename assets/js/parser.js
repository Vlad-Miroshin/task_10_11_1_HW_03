import {Fruit} from './classes.js';

export async function parser (uri) {

       let data;

       await fetch(uri)
        .then(response => response.json())
        .then(val => data = val);

        let items = [];

        for (let i = 0; i < data.length; i++) {

            const item = new Fruit();
            item.kind = data[i].kind;
            item.color = data[i].color;
            item.weight = data[i].weight;

            items.push(item);
        };

        return items;
}

