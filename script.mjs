
import { getUserIds } from "./common.mjs";
import { getData, addData, clearData } from "./storage.mjs";

// Declaring variables
const userSelect = document.querySelector("#usersDropdown");
const topicsContainer = document.querySelector(".topicsContainer");
const topicInput = document.querySelector("#topicInput");
const revisionDateInput = document.querySelector("#revisionDateInput");
const form = document.querySelector("#form");
const msg = document.querySelector(".message");

// Filling the dropdown
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
});

// Displaying topics
function displayTopics() {
  const topics = getData(currentUser) || [];

  const currentDate = new Date();
  // Getting yesterday's date
  currentDate.setDate(currentDate.getDate() - 1);

  const sortedTopics = topics.sort((a, b) => a.revision - b.revision).filter(x => x.revision >= currentDate);

  const options = { day: "numeric", month: "short", year: "numeric" };

  topicsContainer.innerHTML = `
    <h2>Topics to be revised</h2>

    ${sortedTopics.map((topic) => `
        <p>${topic.topicName}, ${new Date(topic.revision).toLocaleDateString("en-GB", options)}</p>
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

  const chosenDate = new Date(revisionDateInput.value);
  const newDate = new Date(chosenDate);
  const newDate1 = new Date(chosenDate);
  const newDate2 = new Date(chosenDate);
  const newDate3 = new Date(chosenDate);
  const newDate4 = new Date(chosenDate);

  const oneWeekLater = newDate.setDate(newDate.getDate() + 7);
  const oneMonthLater = newDate1.setMonth(newDate1.getMonth() + 1);
  const threeMonthsLater = newDate2.setMonth(newDate2.getMonth() + 3);
  const sixMonthsLater = newDate3.setMonth(newDate3.getMonth() + 6);
  const oneYearLater = newDate4.setFullYear(newDate4.getFullYear() + 1);

  const topics = [
    {
      topicName: topicInput.value,
      revision: oneWeekLater,
    },
    {
      topicName: topicInput.value,
      revision: oneMonthLater
    },
    {
      topicName: topicInput.value,
      revision: threeMonthsLater
    },
    {
      topicName: topicInput.value,
      revision: sixMonthsLater
    },
    {
      topicName: topicInput.value,
      revision: oneYearLater
    }
  ]

  addData(currentUser, topics);

  topicInput.value = "";
  revisionDateInput.value = "";

  topicsContainer.style.display = "block";

  displayTopics();
  msg.textContent = "";
}

window.onload = function () {
  loadUsers();
};
