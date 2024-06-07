const playGame = () => {
    createBoard();
    colourPixels();
    resetBoard();
    displayGridMenu();
    displayColourMenu();
}

const createBoard = () => {
    const container = document.querySelector("#container");
    const gridSize = Math.sqrt(pixelCount);
    const pixelSize = 500 / gridSize;

    for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.setAttribute("style", `width: ${pixelSize}px; height: ${pixelSize}px;`);
        container.appendChild(pixel);
    }
};

const colourPixels = () => {
    const pixels = document.querySelectorAll(".pixel");
    let isMouseDown = false;

    document.addEventListener("mousedown", () => isMouseDown = true);
    document.addEventListener("mouseup", () => isMouseDown = false);

    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseover", () => {
            if (isMouseDown) {
                pixel.style.backgroundColor = liveColour;
                pixel.style.border = `0.1px solid ${liveColour}`;
            }
        });

        pixel.addEventListener("mousedown", () => {
            pixel.style.backgroundColor = liveColour;
            pixel.style.border = `0.1px solid ${liveColour}`;
        });
    });
};

const resetBoard = () => {
    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => {
        const container = document.querySelector("#container");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        remakeBoard();
    });
};

const remakeBoard = () => {
    createBoard();
    colourPixels();
}

const displayGridMenu = () => {
    const gridButton = document.querySelector("#changeGridSize");

    gridButton.addEventListener("click", () => {
        const body = document.querySelector("body");

        const gridMenuPopUp = document.createElement("div");
        const gridMenuBackground = document.createElement("div");

        gridMenuPopUp.classList.add("menuPopUp");
        gridMenuPopUp.setAttribute("id", "gridMenuPopUp")

        gridMenuBackground.classList.add("menuBackground");
        gridMenuBackground.setAttribute("id", "gridMenuBackground")

        body.appendChild(gridMenuBackground);
        body.appendChild(gridMenuPopUp);

        gridMenuBackground.addEventListener("click", () => {
            gridMenuPopUp.remove();
            gridMenuBackground.remove();
        });

        populateGridMenu();
    });
};

const populateGridMenu = () => {
    const gridMenuPopUp = document.querySelector("#gridMenuPopUp");
    const gridMenuBackground = document.querySelector("#gridMenuBackground");

    const closeX = document.createElement("div");
    closeX.id = "closeX";
    closeX.textContent = "X";
    closeX.addEventListener("click", () => {
        gridMenuBackground.remove();
        gridMenuPopUp.remove();
    });

    const innerText = document.createElement("div");
    innerText.id = "innerText";
    innerText.textContent = "Choose a new grid size:"

    const sizeSlider = document.createElement("input");
    sizeSlider.type = "range";
    sizeSlider.id = "sizeSlider";
    sizeSlider.min = 8;
    sizeSlider.max = 100;
    sizeSlider.value = 16;
    sizeSlider.step = 1;
    let liveValue = sizeSlider.value;

    const sizeSliderValue = document.createElement("div");
    sizeSliderValue.id = "sizeSliderValue";
    sizeSliderValue.textContent = `${liveValue} x ${liveValue}`;
    sizeSlider.addEventListener("input", (event) => {
        liveValue = event.target.value;
        sizeSliderValue.textContent = `${liveValue} x ${liveValue}`;
    });

    const confirmButton = document.createElement("button");
    confirmButton.id = "confirmButton";
    confirmButton.innerText = "Confirm";
    confirmButton.addEventListener("click", () => {
        gridMenuBackground.remove();
        gridMenuPopUp.remove();
        
        const container = document.querySelector("#container");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        pixelCount = parseFloat(liveValue) * parseFloat(liveValue);
        remakeBoard();
    });

    gridMenuPopUp.appendChild(closeX);
    gridMenuPopUp.appendChild(innerText);
    gridMenuPopUp.appendChild(sizeSlider);
    gridMenuPopUp.appendChild(sizeSliderValue);
    gridMenuPopUp.appendChild(confirmButton);
}

const displayColourMenu = () => {
    const colourButton = document.querySelector("#changeColour");

    colourButton.addEventListener("click", () => {
        const body = document.querySelector("body");

        const colourMenuPopUp = document.createElement("div");
        const colourMenuBackground = document.createElement("div");

        colourMenuPopUp.classList.add("menuPopUp");
        colourMenuPopUp.setAttribute("id", "colourMenuPopUp")

        colourMenuBackground.classList.add("menuBackground");
        colourMenuBackground.setAttribute("id", "colourMenuBackground")

        body.appendChild(colourMenuBackground);
        body.appendChild(colourMenuPopUp);

        colourMenuBackground.addEventListener("click", () => {
            colourMenuPopUp.remove();
            colourMenuBackground.remove();
        });

        populateColourMenu();
    });
};

const populateColourMenu = () => {
    const colourMenuPopUp = document.querySelector("#colourMenuPopUp");
    const colourMenuBackground = document.querySelector("#colourMenuBackground");

    const closeX = document.createElement("div");
    closeX.id = "closeX";
    closeX.textContent = "X";
    closeX.addEventListener("click", () => {
        colourMenuBackground.remove();
        colourMenuPopUp.remove();
    });

    const innerText = document.createElement("div");
    innerText.id = "innerText";
    innerText.textContent = "Choose a new colour:"

    const colourButtonsContainer = document.createElement("div");
    colourButtonsContainer.id = "colourButtonsContainer";

    const colourPicker = document.createElement("input");
    colourPicker.type = "color";
    colourPicker.id = "colourPicker";
    colourPicker.value = "#424242";

    const defaultButton = document.createElement("button");
    defaultButton.id = "defaultButton";
    defaultButton.innerText = "Default";
    defaultButton.addEventListener("click", () => {
        liveColour = "#424242"
        const colourPicker = document.querySelector("#colourPicker");
        colourPicker.value = "#424242";
    });

    colourPicker.addEventListener("input", (event) => {
        liveColour = event.target.value;
    });

    const rainbowButton = document.createElement("button");
    rainbowButton.id = "rainbowButton";
    rainbowButton.textContent = "Rainbow";


    const confirmButton = document.createElement("button");
    confirmButton.id = "confirmButton";
    confirmButton.innerText = "Confirm";
    confirmButton.addEventListener("click", () => {
        colourMenuBackground.remove();
        colourMenuPopUp.remove();
    });

    colourMenuPopUp.appendChild(closeX);
    colourMenuPopUp.appendChild(innerText);
    colourMenuPopUp.appendChild(colourButtonsContainer);
    colourButtonsContainer.appendChild(defaultButton);
    colourButtonsContainer.appendChild(colourPicker);
    colourButtonsContainer.appendChild(rainbowButton);
    colourMenuPopUp.appendChild(confirmButton);
}

let pixelCount = 256;
let liveColour = "#424242"

playGame();