// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData, addData } from "./storage.mjs";

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
    msg.textContent = "Sorry, no topics to revise for the selected user.";
  } else {
    msg.textContent = "";
    displayTopics();
  }
})

// Display topics
function displayTopics() {
  const topics = getData(currentUser) || [];

  topics.forEach((topic) => {
    topicsContainer.innerHTML += `
      <div>
        <h3>${topic.topicName}</h3>
        <p>${topic.revisionDate}</p>
      </div>
     `
  })

}

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) return;
  addTopic();
})

// Add a topic
function addTopic() {
  const topics = getData(currentUser) || [];

  topics.push({
    topicName: topicInput.value,
    revisionDate: revisionDateInput.value
  });

  addData(currentUser, topics);

  topicInput.value = "";
  revisionDateInput.value = "";

  displayTopics();
  msg.textContent = "";
}


window.onload = function () {
  loadUsers();
};
