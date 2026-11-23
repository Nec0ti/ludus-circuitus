import test from "node:test";
import assert from "node:assert/strict";
import { outcomeLabels, quizForms, scoreQuiz } from "../assets/js/quiz-data.mjs";

test("forms A and B cover matching outcomes with eight distinct questions", () => {
  const counts = (form) => Object.fromEntries(Object.keys(outcomeLabels).map((outcome) => [outcome, form.filter((question) => question.outcome === outcome).length]));
  assert.deepEqual(Object.keys(quizForms), ["A", "B"]);
  assert.deepEqual(quizForms.A.map((question) => question.id), quizForms.B.map((question) => question.id));
  assert.deepEqual(counts(quizForms.A), { paralel: 4, verilog: 2, sirali: 2 });
  assert.deepEqual(counts(quizForms.B), counts(quizForms.A));
  assert.deepEqual(quizForms.A.map((question) => question.skill), quizForms.B.map((question) => question.skill));
  for (const form of Object.values(quizForms)) {
    assert.deepEqual(form.reduce((total, question) => (total[question.answer]++, total), [0, 0, 0, 0]), [2, 2, 2, 2]);
  }
  assert.ok(quizForms.A.every((question, index) => question.answer !== quizForms.B[index].answer));
  for (const questions of Object.values(quizForms)) {
    assert.equal(questions.length, 8);
    assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
    for (const question of questions) assert.ok(question.answer >= 0 && question.answer < question.options.length);
  }
});

test("scores primary and secondary outcomes and keeps forms on the same scale", () => {
  for (const form of Object.keys(quizForms)) {
    const allCorrect = Object.fromEntries(quizForms[form].map((question) => [question.id, question.answer]));
    const result = scoreQuiz(form, allCorrect);
    assert.deepEqual(result, { correct: 8, total: 8, percent: 100, outcomes: { paralel: { correct: 4, total: 4 }, verilog: { correct: 2, total: 2 }, sirali: { correct: 2, total: 2 } } });
    const allWrong = Object.fromEntries(quizForms[form].map((question) => [question.id, (question.answer + 1) % question.options.length]));
    assert.equal(scoreQuiz(form, allWrong).percent, 0);
  }
});

test("the paired assign item requires choosing both values and parallel behavior", () => {
  for (const form of Object.values(quizForms)) {
    const item = form.find((question) => question.skill === "assign_yollari");
    assert.match(item.prompt, /çıkış değerlerini hem yolların ilişkisini/);
    assert.match(item.options[item.answer], /iki bağımsız yol birlikte değerlendirilir/);
    assert.equal(item.options.filter((option) => /yolu taşıma yolunu bekler/.test(option)).length, 1);
  }
});

test("rejects an unsupported quiz form", () => {
  assert.throws(() => scoreQuiz("C", {}), /A veya B/);
});
