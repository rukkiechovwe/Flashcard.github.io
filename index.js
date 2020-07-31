const showCardBodyButton = document.querySelector(".add-btn");
const cardBody = document.querySelector(".card-body");
const closeBtn = document.querySelector(".close-btn");
const cardForm = document.querySelector(".card-form");
const questionList = document.querySelector(".question-list");
const info = document.querySelector(".info");
let myArray = [];
let generalid = 0

class FlashCard{
    constructor(question,answer,id){
        this.question = question;
        this.answer = answer;
    }
    FlashCardObject(question,answer,idnumber){
        return (this.storeObject = {question,answer,idnumber})
    }
}

class UI{
    addQuestions(id,questionsCard){
    let div = `<div class="question-list-div" id="${id}">
        <h3 class="question-div-title">${questionsCard.question}</h3>
        <a href="#" class="hide-answer">show/hide Answer</a>
        <h3 class="question-div-answer">${questionsCard.answer}</h3>
        <div class="question-list-btn">
            <button class="flashcard-edit">Edit</button>
            <button class="flashcard-delete">Delete</button>
        </div>
    </div>`;
    questionList.innerHTML += div
    }
    deleteQuestions(target,id){
        target.parentElement.parentElement.remove();
        let myid = target.parentElement.parentElement.id;
        let tempArray = myArray.filter(x=>x.idnumber!==myid);
        myArray = tempArray
        console.log(myArray);
    }
    clearFields(){
        document.querySelector("#inputQuestion").value="";
        document.querySelector("#inputAnswer").value="";
    }
    showOrHideAnswer(target){
        target.nextElementSibling.classList.toggle('question-div-answer-show');
    }
    editQuestions(){
        document.querySelector("#inputQuestion").value = document.querySelector(".question-div-title").innerText
        document.querySelector("#inputAnswer").value = document.querySelector(".question-div-answer").innerText
    }
}

//show question form
showCardBodyButton.addEventListener("click",()=>{
    cardBody.style.display = "block";
    showCardBodyButton.style.display = "none"
})
// close question form
closeBtn.addEventListener("click",()=>{
    cardBody.style.display = "none";
    showCardBodyButton.style.display = "block"
})

//add a question
cardForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //get form values from input
    const inputQuestion = document.querySelector("#inputQuestion").value;
    const inputAnswer = document.querySelector("#inputAnswer").value;
    // create new instances
    const questionCard = new FlashCard(inputQuestion,inputAnswer);
    const ui = new UI();

    if(inputQuestion === "" || inputAnswer === ""){
        info.style.display = "block"
        info.innerHTML = "Fill all empty field";
        let time1 = setTimeout(()=>{info.style.display = "none"},3000)}
    else{
        cardBody.style.display = "none";
        questionList.style.display = "flex"
        generalid++;
        let id = 'div' + generalid;
        ui.addQuestions(id,questionCard)
        let bb = questionCard.FlashCardObject(inputQuestion,inputAnswer,id)
        myArray.push(bb);
        ui.clearFields();
    }
    showCardBodyButton.style.display = "block";
});

//work with a question(delete,hide/show answer,edit)
questionList.addEventListener("click",(e)=>{
    e.preventDefault();
    const ui = new UI();

    if (e.target.className === "flashcard-delete") {
        ui.deleteQuestions(e.target);
    }
    else if (e.target.className === "hide-answer"){
        ui.showOrHideAnswer(e.target);
    }
    else if (e.target.className === "flashcard-edit"){
        cardBody.style.display = "block";
        showCardBodyButton.style.display = "none";
        questionList.style.display = "none";
        ui.editQuestions()
        ui.deleteQuestions(e.target);
    }
    else{return}
});