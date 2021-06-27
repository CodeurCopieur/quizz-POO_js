class Question {
  // new Question('text1',['choix1','choix2','choix3','choix4'], 'choix2')
  constructor(text, choices, answer){
    this.text = text,
    this.choices = choices,
    this.answer = answer
  }
  
  // method pour savoir si c'est la bonne réponse
  isCorrectAnswer(choice) {
    return this.answer === choice
    // retourne un boolean
  }
}

let questions = [
  new Question('Meilleur buteur de l\'equipe de france ? ', ['benzema', 'giroud', 'thierry henry', 'zidane'], 'thierry henry'),
  new Question('Qui marque un double en 98(finale) ? ', ['platini', 'trezeguet', 'thierry henry', 'zidane'], 'zidane'),
  new Question('Qui marque le premier but en 2018(finale) ? ', ['griezmann', 'giroud', 'mbappe', 'zidane'], 'griezmann'),
  new Question('Qui marque le but victorieux en 2000(finale) ? ', ['griezmann', 'trezeguet', 'thierry henry', 'wiltord'], 'trezeguet')
];

class Quizz {
  // new Quizz(questions)
  constructor(questions) {
    this.score = 0; // score cumule pour chaque bonne reponse
    this.questions = questions,
    this.currentQuestionIndex = 0 // l'index de la question actuelle
  }

  // method pour obtenir la question actuelle
  getCurrentQuestion() {
    //questions[0] : pour commencer
    return this.questions[this.currentQuestionIndex];
  }

  // method a declencher pour l'ajout des points
  guess(answer){
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    //on passe a la question suivante
    this.currentQuestionIndex++;
  }

  // method a declancher pour la fin du quizz
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length; // boolean
  }
}

// methods pour logique d'affichage

const display = {
  // cibler de séléments html pour dynamise le contenu
  targetElt: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuizz: function() {
    let endQuizz = `
      <h1>Quizz terminé !</h1>
      <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
    `;

    this.targetElt("quizz", endQuizz);
  },
  question: function(){
    this.targetElt("question", quiz.getCurrentQuestion().text)
  },
  choices: function(){
    //tableau de choix
    let choices = quiz.getCurrentQuestion().choices;
    
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function(){
        quiz.guess(guess);
        quizApp();
      }
    }

    for (let index = 0; index < choices.length; index++) {
      this.targetElt('choice'+index, choices[index]);
      guessHandler("guess"+index, choices[index]);
    }
  },
  progress: function() {
    let numberQuestion = quiz.currentQuestionIndex+1;
    this.targetElt("progress", "Question " + numberQuestion);
  }
}

// loqique du jeux
quizApp = () => {
  if(quiz.hasEnded()) {
    //end
    display.endQuizz();
  } else {
    // afficher la question
    display.question();
    // afficher les choix
    display.choices();
    // la progression
    display.progress();
  }
}

//creez le quizz
let quiz = new Quizz(questions);
quizApp();

console.log(quiz);