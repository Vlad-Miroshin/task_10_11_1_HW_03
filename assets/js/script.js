const sub_btn = document.querySelectorAll(".sub-btn");

sub_btn.forEach((btn)=>{
    btn.addEventListener('click', function(e) {
        toggle_display(this.closest('.item').querySelector('.sub-menu'));
        this.querySelector('.dropdown').classList.toggle('rotate');
    });
});


function toggle_display(elem) {
    if (elem.style.display === "" || elem.style.display === "none")
        elem.style.display = 'block';
    else 
        elem.style.display = 'none';
}



// алгоритм перетасовки Фишера-Йейтса
function shuffleArray(arr) {
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