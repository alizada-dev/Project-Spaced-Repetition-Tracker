// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData, addData, clearData } from "./storage.mjs";

const userSelect = document.querySelector("#usersDropdown");
const topicsContainer = document.querySelector(".topicsContainer");
const topicInput = document.querySelector("#topicInput");
const revisionDateInput = document.querySelector("#revisionDateInput");
const form = document.querySelector("#form");
const msg = document.querySelector(".message");

function loadUsers() {
  const users = getUserIds();

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.innerHTML = user;
    userSelect.append(option);
  })
}

// Global variable
let currentUser = null;

// Selecting a user from the dropdown
userSelect.addEventListener("change", (e) => {
  currentUser = e.target.value;

  const userData = getData(currentUser) || [];

  if (userData.length === 0) {
    topicsContainer.style.display = "none";
    msg.textContent = "Sorry, no topics to revise for the selected user.";
    return;
  }

  msg.textContent = "";
  topicsContainer.style.display = "block";
  displayTopics();

})

// Displaying topics
function displayTopics() {
  const topics = getData(currentUser) || [];

  topicsContainer.innerHTML = `
    <h2>Topics to be revised</h2>

    ${topics.map((topic) => `
      <div>
        <p>${topic.topicName}, ${topic.revisionOneWeekLater}</p>
        <p>${topic.topicName}, ${topic.revisionOneMonthLater}</p>
        <p>${topic.topicName}, ${topic.revisionThreeMonthsLater}</p>
        <p>${topic.topicName}, ${topic.revisionSixMonthsLater}</p>
        <p>${topic.topicName}, ${topic.revisionOneYearLater}</p>
      </div>
    `).join("")}
  `;
}

// Submitting the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) return;
  addTopic();
});

// Adding a topic
function addTopic() {
  if (!currentUser) return;

  // const topics = getData(currentUser) || [];

  // topics.push({
  //   topicName: topicInput.value,
  //   revisionDate: revisionDateInput.value
  // });

  const originalDate = new Date(revisionDateInput.value);
  const newDate = new Date(originalDate);
  const newDate1 = new Date(originalDate);
  const newDate2 = new Date(originalDate);
  const newDate3 = new Date(originalDate);
  const newDate4 = new Date(originalDate);

  const options = {day: "numeric", month: "short", year: "numeric"};

  const oneWeekLater = new Date(newDate.setDate(newDate.getDate() + 7)).toLocaleDateString("en-GB", options);
  const oneMonthLater = new Date(newDate1.setMonth(newDate1.getMonth() + 1)).toLocaleDateString("en-GB", options);
  const threeMonthsLater = new Date(newDate2.setMonth(newDate2.getMonth() + 3)).toLocaleDateString("en-GB", options);
  const sixMonthsLater = new Date(newDate3.setMonth(newDate3.getMonth() + 6)).toLocaleDateString("en-GB", options);
  const oneYearLater = new Date(newDate4.setFullYear(newDate4.getFullYear() + 1)).toLocaleDateString("en-GB", options);

  const topic = {
    topicName: topicInput.value,
    revisionOneWeekLater: oneWeekLater,
    revisionOneMonthLater: oneMonthLater,
    revisionThreeMonthsLater: threeMonthsLater,
    revisionSixMonthsLater: sixMonthsLater,
    revisionOneYearLater: oneYearLater
    }

  addData(currentUser, topic);

  topicInput.value = "";
  revisionDateInput.value = "";

  topicsContainer.style.display = "block";

  displayTopics();
  msg.textContent = "";
}


window.onload = function () {
  loadUsers();
};
