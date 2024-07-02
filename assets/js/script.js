const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sideBar = document.querySelector(".side-bar");
const subBtn_1 = document.querySelector("#sub-btn-1");
const subMenu_1 = document.querySelector("#sub-menu-1");
const subBtn_2 = document.querySelector("#sub-btn-2");
const subMenu_2 = document.querySelector("#sub-menu-2");

menuBtn.addEventListener('click', function(e) {
    sideBar.classList.add('active');
    menuBtn.style.visibility = 'hidden';
}); 

closeBtn.addEventListener('click', function(e) {
    sideBar.classList.remove('active');
    menuBtn.style.visibility = 'visible';
}); 

subBtn_1.addEventListener('click', function(e) {
    toggle_display(subMenu_1);
}); 

subBtn_2.addEventListener('click', function(e) {
    toggle_display(subMenu_2);
}); 

function toggle_display(elem) {
    if (elem.style.display === "" || elem.style.display === "none")
        elem.style.display = 'block';
    else 
        elem.style.display = 'none';
}

