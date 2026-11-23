import { outcomeLabels, quizForms, scoreQuiz } from "./quiz-data.mjs";

const $ = (selector) => document.querySelector(selector);
const questionsHost = $("#quiz-questions");
const resultHost = $("#quiz-results");
resultHost.tabIndex = -1;
let form = "A";
let answers = {};

function text(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = value;
  return node;
}

function renderQuestions() {
  questionsHost.replaceChildren();
  quizForms[form].forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-question";
    const legend = document.createElement("legend");
    legend.append(text("span", "quiz-number", String(index + 1).padStart(2, "0")));
    legend.append(text("span", "quiz-prompt", question.prompt));
    fieldset.append(legend);
    const options = document.createElement("div");
    options.className = "quiz-options";
    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.value = String(optionIndex);
      input.checked = answers[question.id] === optionIndex;
      input.addEventListener("change", () => {
        answers[question.id] = optionIndex;
        resultHost.hidden = true;
        $("#quiz-status").textContent = "Yanıtların seçildi. Tüm soruları yanıtlayınca değerlendirebilirsin.";
      });
      label.append(input, document.createTextNode(option));
      options.append(label);
    });
    fieldset.append(options);
    questionsHost.append(fieldset);
  });
}

function renderResults() {
  const result = scoreQuiz(form, answers);
  const questions = quizForms[form];
  resultHost.replaceChildren();
  resultHost.hidden = false;
  const heading = text("h2", "", "Değerlendirme sonucu");
  heading.id = "result-title";
  const summary = text("p", "quiz-score", `${result.correct}/${result.total} doğru · ${result.percent}/100`);
  const note = text("p", "quiz-result-note", "Bu puan yalnızca yanıtladığın kısa alıştırmanın özetidir.");
  resultHost.append(heading, summary, note);

  const breakdown = document.createElement("ul");
  breakdown.className = "quiz-breakdown";
  for (const [key, label] of Object.entries(outcomeLabels)) {
    const score = result.outcomes[key];
    const item = document.createElement("li");
    item.append(text("span", "", label), text("strong", "", `${score.correct}/${score.total}`));
    breakdown.append(item);
  }
  resultHost.append(breakdown);

  const review = document.createElement("div");
  review.className = "quiz-review";
  review.setAttribute("aria-label", "Yanıt açıklamaları");
  questions.forEach((question, index) => {
    const correct = answers[question.id] === question.answer;
    const article = document.createElement("article");
    article.className = `quiz-review-item ${correct ? "is-correct" : "is-incorrect"}`;
    article.append(text("h3", "", `${index + 1}. soru · ${correct ? "Doğru" : "Bir daha düşün"}`));
    article.append(text("p", "", question.explanation));
    if (!correct) article.append(text("p", "quiz-correct-answer", `Doğru yanıt: ${question.options[question.answer]}`));
    review.append(article);
  });
  resultHost.append(review);

  const restart = text("button", "btn btn-outline", "Bu formu yeniden çöz");
  restart.type = "button";
  restart.addEventListener("click", resetForm);
  resultHost.append(restart);
  resultHost.focus();
}

function resetForm() {
  answers = {};
  resultHost.hidden = true;
  renderQuestions();
  $("#quiz-status").textContent = "Yanıtlar sıfırlandı. Cevaplar sayfadan ayrılınca saklanmaz.";
  questionsHost.querySelector("input")?.focus();
}

document.querySelectorAll("[data-form]").forEach((button) => {
  button.addEventListener("click", () => {
    form = button.dataset.form;
    answers = {};
    document.querySelectorAll("[data-form]").forEach((item) => {
      const selected = item === button;
      item.setAttribute("aria-pressed", String(selected));
      item.classList.toggle("btn-primary", selected);
      item.classList.toggle("btn-ghost", !selected);
    });
    $("#quiz-form-note").textContent = `Form ${form} seçili. Diğer form aynı konuları farklı örneklerle sorar.`;
    resultHost.hidden = true;
    $("#quiz-status").textContent = "Devam etmek için her soruya bir yanıt seç.";
    renderQuestions();
  });
});

$("#quiz-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const missing = quizForms[form].find((question) => !Object.hasOwn(answers, question.id));
  if (missing) {
    $("#quiz-status").textContent = "Değerlendirmeden önce tüm soruları yanıtla.";
    questionsHost.querySelector(`input[name="${missing.id}"]`)?.focus();
    return;
  }
  $("#quiz-status").textContent = "Yanıtların değerlendirildi.";
  renderResults();
});

renderQuestions();
