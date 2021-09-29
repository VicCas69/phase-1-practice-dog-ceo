const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

function display(){
    const f = fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())    
    .then(json => eachDog(json))
    return f;
}

//console.log(imgUrl)


function eachDog(dogs){
    
    const body = document.querySelector('div#dog-image-container');
    dogs.message.forEach( dog => {
        const ul = document.createElement('ul')         
        const img = document.createElement('img');
        //console.log(img)
        img.src = dog;
        ul.appendChild(img)
        //console.log(p);
       //console.log(img);
       body.appendChild(ul)
    });
}


document.addEventListener('DOMContentLoaded', display)
document.addEventListener('DOMContentLoaded', breeds)
document.addEventListener('DOMContentLoaded', filter)

function breeds(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp=>resp.json())
    .then(json => breedList(json))
}

function breedList(breed){
    //console.log(breed.message)
    const list = document.getElementById("dog-breeds");
    for(let b in breed.message){
        const li = document.createElement("li");
        //console.log(b)        
        li.innerText = b;
        //console.log(li)
        li.addEventListener('click', ()=> {
           li.style.color = "red";
        })
        list.appendChild(li)
    }
}





function filter(){
    const list = document.getElementById("breed-dropdown");
    let breedsList = [];
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp=>resp.json())
    .then(data=>breedsList = Object.keys(data.message));
    const dogs = document.getElementById("dog-breeds")
    
    list.addEventListener('change', (event)=>{
        //console.log(breedsList);
        const filteredBreeds = breedsList.filter((breed)=>{
            return breed.charAt(0)===event.target.value            
        })
        
        /*for(let b of breedsList.children){              
            if(b.innerText.charAt(0) === event.target.value){
                filteredBreeds.push(b.innerText)                        
        }*/
        while (dogs.firstChild) {
            dogs.removeChild(dogs.firstChild);
        }  
        for (let breed of filteredBreeds){
            const li = document.createElement('li');
            li.textContent = breed;
            //console.log(filteredBreeds)
            dogs.appendChild(li)
        }        
    })
}
