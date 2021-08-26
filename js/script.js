"use strict"
//CARDS

const buttons = document.querySelectorAll('.game__rank');
const icons = document.querySelectorAll('.fas');
let activeButtons = 0;
if(buttons.length > 0){

    buttons.forEach(button => {
        button.addEventListener("click", function(e){
            const currentButton = e.target.parentElement;
            const currentIcon = currentButton.querySelector('.fas');

            currentButton.classList.toggle('_active');

            currentIcon.classList.toggle('fa-search-plus');
            currentIcon.classList.toggle('fa-search-minus');

            const activeButtons = document.querySelectorAll('.game__rank._active');
			
            if(activeButtons.length > 1){
				activeButtons.forEach(activeButton => {
				    activeButton.classList.remove('_active');
                    const activeIcon = activeButton.querySelector('.fas');
                    activeIcon.classList.toggle('fa-search-plus');
                    activeIcon.classList.toggle('fa-search-minus');
				});
                currentButton.classList.toggle('_active');

                currentIcon.classList.toggle('fa-search-plus');
                currentIcon.classList.toggle('fa-search-minus');
			}

        });
    });
}