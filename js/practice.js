// define containers

const initialContainerCookie = document.getElementById('fruit-container');

const endContainerCookie = document.getElementById('fruit-plate');

let practiceCount = 0;

document.getElementById('instructions').click();

if (practice) {
    // edit instructions & button text
    const pracInstructions = document.getElementById('instructions');

    pracInstructions.textContent = 'Practice Mode Active, press spacebar to move ALL the chocolate chip cookies into the blue region.';

    const addButton = document.getElementById('add-fruit');
    addButton.textContent = 'Add Cookie';
    const removeButton = document.getElementById('remove-fruit');
    removeButton.textContent = 'Remove Cookie';
    const clearButton = document.getElementById('clear-fruit');
    clearButton.textContent = 'Clear Cookies';

    // create cookies

    const practiceTypes = ['../images/ChocoCookie.png', '../images/SugarCookie.png'];

    function popCookies(foodTypes) {
        let innerFoods = [];
        let cookies = [];
        let cookieCount = 7;



        for (let i = 0; i < 2; i++){ 
            for (let j = 0; j < cookieCount; j++) {
                innerFoods.push(foodTypes[i]);
            }
        }

        cookies = [innerFoods, innerFoods];
        return cookies; 
    }

    let foodCookies = popCookies(practiceTypes);

    function setCookies(imagePaths) {
        // clear container if there are still leftover fruits from last phase
        initialContainerCookie.innerHTML = '';

        

        imagePaths.forEach(imagePath => {
            const cookie = document.createElement('div');
            cookie.className = 'cookie';
            cookie.style.backgroundImage = `url(${imagePath})`;
            initialContainerCookie.appendChild(cookie);
        })
    }

    setCookies(foodCookies[0]);

    // increase gap between cookies for better viewability

    initialContainerCookie.style.gap = '7px';
    endContainerCookie.style.gap = '10px';


    // movement logic (addCookie is using addFruits logic, not included here)

    function removeCookie() {
        
            let cookies = endContainerCookie.querySelectorAll('.cookie');
            let placeHolderCookies = initialContainerCookie.querySelectorAll('.placeholder');

            let lastCookie = cookies[cookies.length - 1];
            let lastPlaceHolder =  placeHolderCookies[placeHolderCookies.length - 1];
            if (practice) {
                initialContainerCookie.replaceChild(lastCookie, lastPlaceHolder);
            }
        
    }

    const removeCookieButton = document.getElementById('remove-fruit');

    removeCookieButton.addEventListener('click', function() {
        removeCookie();
    });

    const clearCookieButton = document.getElementById('clear-fruit');
    
    clearCookieButton.addEventListener('click', function() {
            clearFood();
    });

    
    
    // diff approach to clear logic

    function clearFood() {
        if (practice) {
            while (endContainerCookie.children.length > 0) {
                removeCookie();
            }
        } else {
            while (endContainer.children.length > 0) {
                removeFruits();
            }
        }
    }







    const phaseCookieButton = document.getElementById('next-phase');
    phaseCookieButton.addEventListener('click', function() {

        practiceCount++;
        
        if (practiceCount < 2) {
            endContainerCookie.innerHTML = '';
            setCookies(foodCookies[practiceCount]);
        } else if (practiceCount == 2) {
            practice = false;
            initialContainerCookie.innerHTML = '';
        } else if (practiceCount > 2) {
            // do nothing
        }

    });
}


