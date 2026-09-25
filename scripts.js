const container = document.querySelector("#container");
const buttonNewGrid = document.querySelector("#newGrid");
const buttonShowGrid = document.querySelector("#showGrid");
const buttonClear = document.querySelector("#clearGrid");
const selectColorBrush = document.querySelector("#colors");
buttonNewGrid.textContent = "Change Grid Size";
buttonClear.textContent = "Clear";

//Set Black as default and create a list of colors
const colorArr = ["0, 100%, 0%"];
selectColorBrush.style.backgroundColor = "hsl(0, 100%, 0%)";
selectColorBrush.value = "0, 100%, 0%";

for (let i = 0; i < 360; i+=20) {
  colorArr.push(i+", 100%, 50%"); //create a rainbow of colors
}
for (let color in colorArr){
    let option = document.createElement("option");
    option.value = colorArr[color];
    option.style.backgroundColor = "hsl("+colorArr[color]+")";
    selectColorBrush.add(option);
}

//Set base squares numbers to 16
let squareNumber = 16;
buttonNewGrid.addEventListener("click", ()=>{
    squareNumber = Number(prompt("Enter squares Number"));
    if(!Number.isInteger(squareNumber))
        createGrid(16);
    else
        createGrid(squareNumber);    
});
buttonClear.addEventListener("click",()=>{
    createGrid(squareNumber);
});


function createGrid(size){
     
    container.replaceChildren(); //empty the grid before creating the new one
    if(size>100)
        size=100;
    for (let i=0; i<(size*size); i++){
        let divGrid = document.createElement("div");
        divGrid.classList.add("square");
        divGrid.style.width=(100/size)+"%"; //Adjust the size of each square to fit 16 per line

        //B&W
        divGrid.style.backgroundColor = `hsl(${selectColorBrush.value}, 0)`;

        container.appendChild(divGrid);

        
        let opacity = 0;
        let isMouseDown = false;

        function changeOpacity(){ //darken the square by 20% on each hover
            if(isMouseDown){
                divGrid.style.backgroundColor = `hsl(${selectColorBrush.value}, ${opacity})`; //use the selected color
                if(opacity<1)
                    opacity = opacity + 0.2;
                divGrid.style.backgroundColor = `hsl(${selectColorBrush.value}, ${opacity})`;
            }
        }
        selectColorBrush.addEventListener("change", ()=>{ //Change color of the select  
            selectColorBrush.style.backgroundColor = `hsl(${selectColorBrush.value})`;
        });        

        //Test if mouse is down while listening to the squares 
        container.addEventListener("mousedown", (e)=>{
            e.preventDefault()
            isMouseDown = true;
        });

        window.addEventListener("mouseup", ()=>{
            isMouseDown = false;
        });

        divGrid.addEventListener("mousedown", (e)=>{ //Trigger changeOpacity on click
            e.preventDefault()
            isMouseDown = true;
            changeOpacity();
        });   
        
        divGrid.addEventListener("mouseover", changeOpacity);

        let gridOn = true;
        buttonShowGrid.textContent="Hide grid";
        divGrid.style.border = "1px solid hsl(0, 0%, 94%)";
        buttonShowGrid.addEventListener("click", ()=>{
            if (!gridOn){
                divGrid.style.border = "1px solid hsl(0, 0%, 94%)";
                buttonShowGrid.textContent="Hide grid";
                gridOn = true;
            }else{
                divGrid.style.border = "0px";
                buttonShowGrid.textContent="Show grid";
                gridOn = false;
            }
        });
        
    }    
    
}

createGrid(squareNumber);