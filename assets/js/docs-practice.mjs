for (const form of document.querySelectorAll("[data-docs-practice]")) {
  const feedback = form.querySelector("[data-feedback]");
  form.addEventListener("change", () => {
    feedback.textContent = "";
    delete feedback.dataset.state;
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const answer = new FormData(form).values().next().value;
    const correct = answer === form.dataset.answer;
    feedback.dataset.state = correct ? "correct" : "retry";
    feedback.textContent = correct ? form.dataset.correctText : form.dataset.retryText;
  });
}
