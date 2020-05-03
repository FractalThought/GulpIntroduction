const courseCards = document.querySelectorAll(".course-card");

courseCards.forEach((card) => {
  card.addEventListener("click", SendAlert);
});

function SendAlert(event) {
  event.preventDefault();
  alert("lol");
}
