document.addEventListener("DOMContentLoaded", () => {
  const cardDisplaySection = document.querySelector(".card-display-section");
  const holeCardSection = document.querySelector(".hole-cards-section");
  const cardNavigation = document.querySelector(".card-navigation");
  const alert = document.querySelector(".alert");
  let myAudio = new Audio("/audio/Children Yay  Sound Effect.mp3")
  let audio = new Audio("/audio/growl.mp3");
  let selectedCards = [];
  let selectedTargetCards = [];
  let classTallyArray = [];
  let classTally;

  const cards = [
    {
      name: "/images/Three.jpg",
      alt: "Three",
      class: "Three",
    },
    {
      name: "/images/King.jpg",
      alt: "King",
      class: "King",
    },
    {
      name: "/images/Ace.jpg",
      alt: "Ace",
      class: "Ace",
    },
    {
      name: "/images/Queen.jpg",
      alt: "Queen",
      class: "Queen",
    },
    {
      name: "/images/Nine.jpg",
      alt: "Nine",
      class: "Nine",
    },
    {
      name: "/images/Seven.jpg",
      alt: "Seven",
      class: "Seven",
    },
    {
      name: "/images/Eight.jpg",
      alt: "Eight",
      class: "Eight",
    },
  ];

  const cardDisplayButtons = [
    {
      name: "Ace",
    },
    {
      name: "Three",
    },
    {
      name: "King",
    },
    {
      name: "Queen",
    },
    {
      name: "Nine",
    },
    {
      name: "Seven",
    },
    {
      name: "Eight",
    },
  ];

  let displayCards = cards.map((card) => {
    return `<div class=${card.class} id="card"> 
      <img src="/images/backface.jpg" alt=${card.alt}/>
    </div>`;
  });
  displayCards = displayCards.join("");
  cardDisplaySection.innerHTML = displayCards;

  let displayButtons = cardDisplayButtons.map((btn) => {
    return `
    <button class="btn">${btn.name}</button>
    `;
  });
  displayButtons = displayButtons.join("");
  cardNavigation.innerHTML = displayButtons;

  function displayHoleCards() {
    const btn = document.querySelectorAll(".btn");
    const cards = document.querySelectorAll("#card");
    btn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const currentClick = e.currentTarget.innerHTML;
        for (const card of cards) {
          const currentClassName = card.className;
          let checkForTrue = currentClick === currentClassName;
          if (checkForTrue === true) {
            const div = document.createElement("div");
            div.setAttribute("id", "hole");
            div.classList.add(`${currentClick}`);
            div.innerHTML = `<img src="/images/${currentClick}.jpg"/>`;
            holeCardSection.appendChild(div);
            selectedCards.push(div);
            if (selectedCards.length === 2) {
              cardNavigation.style.pointerEvents = "none";
              cards.forEach((card) => {
                card.addEventListener("click", (e) => {
                  let targetCard = e.currentTarget;
                  let targetCardClass = targetCard.className;
                  targetCard.innerHTML = `<img src="/images/${targetCardClass}.jpg"/>`;
                  selectedTargetCards.push(targetCard);
                  if (selectedTargetCards.length === 3) {
                    cardDisplaySection.style.pointerEvents = "none";
                    let totalCards = selectedCards.concat(selectedTargetCards);
                    totalCards.forEach((totalCard) => {
                      classTally = totalCard.className;
                      classTallyArray.push(classTally);
                    });
                    let Ace = classTallyArray.filter(x => x === "Ace").length;
                    let King = classTallyArray.filter(x => x === "King").length;
                    let Queen = classTallyArray.filter(x => x === "Queen").length;
                    let Nine = classTallyArray.filter(x => x === "Nine").length;
                    let Seven = classTallyArray.filter(x => x === "Seven").length;
                    let Three = classTallyArray.filter(x => x === "Three").length;
                    let Eight = classTallyArray.filter(x => x === "Eight").length;


                    if (Ace === 3 || King === 3 || Queen === 3 || Nine === 3 || Seven === 3 || Three === 3 || Eight === 3) {
                      alert.innerHTML = "Three of a Kind";
                      alert.style.display = "flex";
                      myAudio.play();
                      alert.addEventListener("click", () => {
                        alert.style.display = "none";
                      }) 
                    } else{
                      audio.play();
                    }
                  }
                });
              });
            }
          }
        }
      });
    });
  }

  displayHoleCards();
  // let noPath = cardName.split("/").pop();
  // let newName = noPath.split(".").slice(0, -1).join(".");
});
