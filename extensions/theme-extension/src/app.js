// shipready in TRACKING_URL is the app name and it should be based on the app proxy!
const APP_NAME = "shipready"; // should be changed based on the name of your app
const TRACKING_URL = `/apps/${APP_NAME}/api/events`;

console.log("shipready is running!!")

window.shipready = window.shipready || [];

function handlePushEvent(eventName, eventDetails) {
  const requestData = {
    event: eventName,
    details: eventDetails,
    timestamp: new Date().toISOString(),
  };

  fetch(TRACKING_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Event sent successfully");
      } else {
        console.error("Error sending event:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error sending event:", error);
    });
}

window.shipready.push = function (eventName, eventDetails) {
  Array.prototype.push.call(this, [eventName, eventDetails]);
  handlePushEvent(eventName, eventDetails);
};
