const subBtn_1 = document.querySelector("#sub-btn-1");
const subMenu_1 = document.querySelector("#sub-menu-1");
const subBtn_2 = document.querySelector("#sub-btn-2");
const subMenu_2 = document.querySelector("#sub-menu-2");

subBtn_1.addEventListener('click', function(e) {
    toggle_display(subMenu_1);
    this.querySelector('.dropdown').classList.toggle('rotate');
}); 

subBtn_2.addEventListener('click', function(e) {
    toggle_display(subMenu_2);

    this.querySelector('.dropdown').classList.toggle('rotate');
}); 

function toggle_display(elem) {
    if (elem.style.display === "" || elem.style.display === "none")
        elem.style.display = 'block';
    else 
        elem.style.display = 'none';
}

