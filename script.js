const canvas = document.querySelector('#canvas');

let isMouseDown = false;
let eraserOrPen = true;
let canvasButtonsQuantity ;


document.querySelector('#eraser-button').addEventListener('click', () => {
    eraserOrPen = false;
});

document.querySelector('#pen-button').addEventListener('click', () => {
    eraserOrPen = true;
});

setCanvas();

function setCanvas() {

    canvasButtonsQuantity = document.querySelector('#sliderCanvasPixels').value;

    canvas.setAttribute('style', `grid-template-columns: repeat(${canvasButtonsQuantity}, 1fr);
    grid-template-rows: repeat(${canvasButtonsQuantity}, 1fr);`);

    clearCanvas();

    for (let id = 0; id <= (canvasButtonsQuantity * canvasButtonsQuantity - 1); id++) {
        const button = document.createElement('button');
        button.id = id;
        button.classList.add('canvasButton');
        button.addEventListener('mousemove', () => {
            let color = document.querySelector('#color-input').value
            if (isMouseDown) {
                if (eraserOrPen) {
                    button.setAttribute('style', `background-color: ${color};`)
                } else {
                    button.setAttribute('style', `background-color: white;`)
                }
            }
        });
        button.addEventListener('click', () => {
            let color = document.querySelector('#color-input').value
            if (eraserOrPen) {
                button.setAttribute('style', `background-color: ${color};`)
            } else {
                button.setAttribute('style', `background-color: white;`)
            }
        });
        canvas.appendChild(button);
    }
}

canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

document.body.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.querySelector('#sliderCanvasPixels').oninput = () => {
    canvasButtonsQuantity = document.querySelector('#sliderCanvasPixels').value;
    document.querySelector('.sliderValue').innerHTML = `${canvasButtonsQuantity} x ${canvasButtonsQuantity}`
}

document.querySelector('#sliderCanvasPixels').addEventListener('click', () => {
    setCanvas();
})

function clearCanvas() {
    document.querySelectorAll('.canvasButton').forEach((button) => {
        button.setAttribute('style', `background-color: white;`)
    });
}

document.querySelector('#clear-button').addEventListener('click', () => {
    clearCanvas();
});
