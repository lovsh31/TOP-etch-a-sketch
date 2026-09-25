/*Create the divs using JavaScript. Don’t try to create them by hand by copying and pasting them in your HTML file!
It’s best to put your grid squares inside a “container” div. This div can be written in your HTML file.
Use Flexbox to make the divs appear as a grid (versus just one on each line). Despite the name, do not be tempted to research or use CSS Grid, as it will be taught in a later lesson after the foundations path. This project is an opportunity specifically to practice Flexbox!*/
const container = document.querySelector("#container");
const buttonNewGrid = document.querySelector("#newGrid");
let squareNumber = 16;

buttonNewGrid.addEventListener("click", ()=>{
    squareNumber = Number(prompt("Enter squares Number"));
    console.log(Number.isInteger(squareNumber));
    if(!Number.isInteger(squareNumber))
        createGrid(16);
    else
        createGrid(squareNumber);
    
});


function createGrid(size){
    
    
    container.replaceChildren(); //empty the grid before creating the new one
    for (let i=0; i<(size*size); i++){
        let divGrid = document.createElement("div");
        divGrid.classList.add("square");
        divGrid.style.width=(99/size)+"%"; //Adjust the size of each square to fit 16 per line
        divGrid.textContent = i+1;
        container.appendChild(divGrid);
    }    
    
}


createGrid(squareNumber);