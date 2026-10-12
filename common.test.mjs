import { getUserIds } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";
import { calculateDate } from "./utils.mjs";


test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("calculateDate function returns the correct revision dates", () => {
  const topic = {
    topicName: "JavaScript Asynchronous Functions",
    chosenDate: "2026-10-12",
  }
  const calculation = calculateDate(topic.topicName, topic.chosenDate);

  assert.equal(calculation[0].revisionDate, "2026-10-19");
  assert.equal(calculation[1].revisionDate, "2026-11-12");
  assert.equal(calculation[2].revisionDate, "2027-01-12");
  assert.equal(calculation[3].revisionDate, "2027-04-12");
  assert.equal(calculation[4].revisionDate, "2027-10-12");
});

test("calculateDate returns 5 revision dates even for past dates", () => {
  const topic = {
    topicName: "Codewars",
    chosenDate: "2026-09-12"
  }
  const result = calculateDate(topic.topicName, topic.chosenDate);

  assert.equal(result[0].revisionDate, "2026-09-19");
  assert.equal(result[1].revisionDate, "2026-10-12");
  assert.equal(result[2].revisionDate, "2026-12-12");
  assert.equal(result[3].revisionDate, "2027-03-12");
  assert.equal(result[4].revisionDate, "2027-09-12");
});