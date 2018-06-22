const state = {mode: 3};

window.addEventListener('click', event => {
    if (event.target.matches('button')) {
        cleanActive();
        cleanColors();
        cleanSuccess();

        if (event.target.textContent === 'Easy Mode')
            state.mode = 3;
        else if (event.target.textContent === 'Hard Mode')
            state.mode = 6;

        event.target.classList.add('active');

        insertColor(state.mode);
        calculateRandomRgb();

        document.querySelector('h1').innerHTML = state.result;
    } else if (event.target.matches('.colorSquare')) {
        if (state.colors.length > 1) {
            if (event.target.style.backgroundColor === state.result) {
                document.querySelector('.header').style.backgroundColor = 'green';
                document.querySelector('h1').innerHTML = 'You Win!!';
                deleteWrongColors();
            } else {
                event.target.style.backgroundColor = '#1f1f1f';
                event.target.style.visibility = 'hidden';
                state.colors.splice(state.colors.indexOf(event.target.style.backgroundColor), 1);

                if (state.colors.length == 1) {
                    document.querySelector('.header').style.backgroundColor = 'red';
                    document.querySelector('h1').innerHTML = 'You Lose :(';
                }
            }
        }
    }
});

const deleteWrongColors = () => {
    document.querySelectorAll('.colorSquare').forEach(elem => {
        if (elem.style.backgroundColor !== state.result) {
            elem.style.backgroundColor = '#1f1f1f';
            elem.style.visibility = 'hidden';
        }
    });
};

const cleanSuccess = () => {
    document.querySelector('.header').style.backgroundColor = '#427aa7';
};

const cleanActive = () => {
    const activeElem = document.querySelector('.active');

    if (activeElem != null)
        activeElem.classList.remove('active');
};

const cleanColors = () => {
    document.querySelector('.colors').innerHTML = '';
};

const  calculateRandomRgb = () => {
    state.colors = [];

    document.querySelectorAll('.colorSquare').forEach(element => {
        const col = `rgb(${Math.floor(Math.random() * Math.floor(255))}, ${Math.floor(Math.random() * Math.floor(255))}, ${Math.floor(Math.random() * Math.floor(255))})`;
        element.style.backgroundColor = col;
        state.colors.push(col);
    });

    state.result = state.colors[Math.floor(Math.random() * Math.floor(state.colors.length))];
};

const insertColor = (many) => {
    for (let i = 0 ; i < many; i++)
        document.querySelector('.colors').insertAdjacentHTML("beforeend", `<div class="colorSquare"></div>`);
};