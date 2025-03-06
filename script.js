function addQuestion() {
  // GET QUESTION INPUT TEXT
  const text = document.querySelector("#new-question-input").value;
  if (!text) return; // prevent empty submissions

  let scriptURL = "https://script.google.com/macros/s/AKfycbxzRCaBJ9JmaHHD4jrx-tgQHoaB7d18NW7bcPj_p-dypoVEMzVe_T9OjW3HzFQETfH6/exec";

  fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Response from Google Apps Script:", data);  // Log the response from Apps Script
      if (data.status === "Success") {
          document.querySelector("#new-question-input").value = "";
          fetchQuestions(); // Refresh the list of questions from Google Sheets
      } else {
          console.error("Error submitting question:", data.message);
      }
  })
  .catch(error => console.error("Error:", error));
  
  // CREATE QUESTION CONTAINER
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question-container');
  
  // CREATE NEW QUESTION
  // 1. Create an h4 element
  const question = document.createElement('h4');
  // 2. Update h4 text to question input text
  question.innerText = text;
  question.style.fontStyle = 'italic';
  // 3. Append question to new question container
  questionContainer.appendChild(question);

  // NAME INPUT
  const usernameInput = document.createElement('input')
  usernameInput.setAttribute('type', 'text');
  usernameInput.setAttribute('class', 'username-input');
  usernameInput.setAttribute('placeholder', 'Enter username');
  questionContainer.appendChild(usernameInput)
  
  // INPUT FOR ANSWER TO NEW QUESTION
  const answerInput = document.createElement('input');
  answerInput.setAttribute('type', 'text');
  answerInput.setAttribute('class', 'answer-input');
  answerInput.setAttribute('placeholder', 'Enter answer');
  questionContainer.appendChild(answerInput)
  
  // SUBMIT ANSWER BUTTON FOR NEW QUESTION
  const submitButton = document.createElement('button');
  submitButton.innerText = "Submit";
  submitButton.setAttribute('class', 'submit-answer-button');
  questionContainer.appendChild(submitButton);

  // CONTAINER FOR ANSWERS
  const answersList = document.createElement('div');
  answersList.classList.add("answers-list");
  questionContainer.appendChild(answersList);

  // event listener for submit button
  submitButton.onclick = function() {
    const answerText = answerInput.value;
    const usernameText = usernameInput.value;
  
    // USER + ANSWER ELEMENT
    const answer = document.createElement('p');
    answer.innerText = `${usernameText}: ${answerText}`;
    questionContainer.appendChild(answer);

    // COMMENT BUTTON
    const commentButton = document.createElement('button')
    commentButton.innerText = "Comment"
    commentButton.setAttribute('class', 'comment-button');
    answer.appendChild(commentButton);

    commentButton.onclick = function() {
      // COMMMENT CONTAINER
      const commentContainer = document.createElement('div')
      commentContainer.classList.add('comment-container');
      const closestAnswer = commentButton.closest('p');
      closestAnswer.appendChild(commentContainer);

      // NAME INPUT
      const usernameInput = document.createElement('input')
      usernameInput.setAttribute('type', 'text');
      usernameInput.setAttribute('class', 'username-input');
      usernameInput.setAttribute('placeholder', 'Enter username');
      commentContainer.appendChild(usernameInput)
      
      // INPUT FOR COMMENT
      const answerInput = document.createElement('input');
      answerInput.setAttribute('type', 'text');
      answerInput.setAttribute('class', 'comment-input');
      answerInput.setAttribute('placeholder', 'Enter comment');
      commentContainer.appendChild(answerInput)

      // SUBMIT ANSWER BUTTON FOR NEW QUESTION
      const submitButton = document.createElement('button');
      submitButton.innerText = "Submit";
      submitButton.setAttribute('class', 'submit-answer-button');
      commentContainer.appendChild(submitButton);
      
      submitButton.onclick = function() {
        // USER + ANSWER ELEMENT
        const comment = document.createElement('p');
        const answerText = answerInput.value;
        const usernameText = usernameInput.value;
        comment.innerText = `${usernameText}: ${answerText}`;
        commentContainer.appendChild(comment);
        answerInput.value = "";
        usernameInput.value= "";
      }
    }
  
    // Clear input after submission
    answerInput.value = "";
    usernameInput.value= "";
  };

  //APPEND TO NEW QUESTION DIV
  document.querySelector('#new-question-div').appendChild(questionContainer);
  // RESET QUESTION INPUT VALUE
  document.querySelector('#new-question-input').value = "";
}

function fetchQuestions() {
  let scriptURL = "https://script.google.com/macros/s/AKfycbxzRCaBJ9JmaHHD4jrx-tgQHoaB7d18NW7bcPj_p-dypoVEMzVe_T9OjW3HzFQETfH6/exec";

  fetch(scriptURL)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched questions:", data);  // Log the fetched data  
        
        let questionDiv = document.querySelector("#new-question-div");
          questionDiv.innerHTML = ""; // Clear previous questions

          data.forEach(q => {
              const questionContainer = document.createElement('div');
              questionContainer.classList.add('question-container');

              const question = document.createElement('h4');
              question.innerText = q.question;
              question.style.fontStyle = 'italic';
              questionContainer.appendChild(question);

              questionDiv.appendChild(questionContainer);
          });
      })
      .catch(error => console.error("Error fetching questions:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.submit-question-button').addEventListener('click', addQuestion);
  fetchQuestions();
});