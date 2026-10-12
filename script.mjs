
import { getUserIds } from "./common.mjs";
import { getData, addData } from "./storage.mjs";

// Declaring variables
const userSelect = document.querySelector("#usersDropdown");
const topicsContainer = document.querySelector(".topicsContainer");
const topicInput = document.querySelector("#topicInput");
const revisionDateInput = document.querySelector("#revisionDateInput");
const form = document.querySelector("#form");
const msg = document.querySelector(".message");
const toast = document.getElementById("snackbar");

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
  // Setting today's time to midnight
  currentDate.setHours(0, 0, 0, 0);

  const sortedTopics = topics
    .sort((a, b) => a.revisionDate - b.revisionDate)
    .filter(x => x.revisionDate >= currentDate);

  const options = { day: "numeric", month: "short", year: "numeric" };

  topicsContainer.innerHTML = `
    <h2>Topics to be revised</h2>

    ${sortedTopics.map((topic) => `
        <p>${topic.topicName}, ${new Date(topic.revisionDate).toLocaleDateString("en-GB", options)}</p>
    `).join("")}
  `;
}

// Submitting the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTopic();
});

// Adding a topic
function addTopic() {
  if (!currentUser) {
    alert("Select a user first");
    return;
  }

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
      revisionDate: oneWeekLater,
    },
    {
      topicName: topicInput.value,
      revisionDate: oneMonthLater
    },
    {
      topicName: topicInput.value,
      revisionDate: threeMonthsLater
    },
    {
      topicName: topicInput.value,
      revisionDate: sixMonthsLater
    },
    {
      topicName: topicInput.value,
      revisionDate: oneYearLater
    }
  ]

  addData(currentUser, topics);

  topicInput.value = "";
  revisionDateInput.value = new Date().toISOString().slice(0, 10);

  topicsContainer.style.display = "block";

  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);

  displayTopics();
  msg.textContent = "";
}

window.onload = function () {
  loadUsers();
  revisionDateInput.value = new Date().toISOString().slice(0, 10);
};
