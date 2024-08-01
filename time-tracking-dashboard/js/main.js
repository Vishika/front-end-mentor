"use strict";

const activitiesContainer = document.getElementById("activities");
const timeFramesContainer = document.getElementById("time-frames");

function getActivityHTML(
  activityName,
  activityCode,
  currentActivity,
  previousActivity,
  previousPhrase
) {
  return `
          <section class="activity activity--${activityCode}">
          <div class="activity__border">
            <img src="images/icon-${activityCode}.svg" alt="" class="activity__img" />
          </div>
          <div class="activity__info">
            <h2 class="actvity__name">${activityName}</h2>
            <img class="activity__ellipsis" src="images/icon-ellipsis.svg" alt="" />
            <p class="activity__current">${currentActivity}hrs</p>
            <p class="activity__previous">${previousPhrase} - ${previousActivity}hrs</p>
          </div>
        </section>`;
}

function getPreviousPhrase(timeFrame) {
  switch (timeFrame) {
    case "daily":
      return "Yesterday";
    case "weekly":
      return "Last Week";
    case "monthly":
      return "Last Month";
    default:
      return "Previous";
  }
}

function sanitizeName(name) {
  return name.replaceAll(" ", "-").toLowerCase();
}

function renderActivity(data, timeFrame) {
  const activityName = data.title;
  const activityCode = sanitizeName(data.title);
  const currentActivity = data.timeframes[timeFrame]?.current;
  const previousActivity = data.timeframes[timeFrame]?.previous;
  const previousPhrase = getPreviousPhrase(timeFrame);
  const activityHTML = getActivityHTML(
    activityName,
    activityCode,
    currentActivity,
    previousActivity,
    previousPhrase
  );
  activitiesContainer.insertAdjacentHTML("beforeend", activityHTML);
}

function getTimeFrame() {
  return document.querySelector('[aria-selected="true"]')?.id;
}

function renderActivities(data) {
  const timeFrame = getTimeFrame();
  data.forEach((data) => renderActivity(data, timeFrame));
}

async function fetchData() {
  const request = await fetch("data/data.json");
  if (!request.ok) return null;
  const data = await request.json();
  return data;
}

async function loadPage() {
  activitiesContainer.innerHTML = "";
  const data = await fetchData();
  renderActivities(data);
}

loadPage();

const selectTimeFrame = function (event) {
  for (const timeFrame of event.currentTarget.children) {
    timeFrame.setAttribute("aria-selected", timeFrame === event.target);
  }
  loadPage();
};

timeFramesContainer.addEventListener("click", selectTimeFrame);
