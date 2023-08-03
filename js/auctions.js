const AUCTION_TIME = 55;

const auctionBtn = document.getElementById("auctionBtn");
const container = document.querySelector(".container");
let auctionStatus = false;

auctionBtn.addEventListener("click", function () {
    auctionBtn.classList.add("auctions--active");
    auctionBtn.disabled = true;
    auctionBtn.innerHTML = "Enchères en cours";
    let audio = new Audio('sounds/jackpot.mp3');

    // start timing auction and remove class active after AUCTION_TIME seconds
    setTimeout(function () {
        audio.play();
        auctionBtn.classList.remove("auctions--active");
        auctionBtn.disabled = false;
        auctionBtn.innerHTML = "Débuter les enchères";
    }, AUCTION_TIME * 1000);
});