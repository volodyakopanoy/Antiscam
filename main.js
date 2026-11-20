
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let width;
let height;
let columns;
let drops;

const fontSize = 16;

const symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const colors = [
    "#ff2d95",
    "#00eaff",
    "#b026ff",
    "#ff8c42",
    "#ffdf5d"
];

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawMatrix() {
    ctx.fillStyle = "rgba(9, 0, 20, 0.09)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const symbol = symbols[
            Math.floor(Math.random() * symbols.length)
        ];

        ctx.fillStyle = Math.random() > 0.92
            ? "#ffffff"
            : colors[Math.floor(Math.random() * colors.length)];

        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;

        ctx.fillText(
            symbol,
            i * fontSize,
            drops[i] * fontSize
        );

        ctx.shadowBlur = 0;

        if (
            drops[i] * fontSize > height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}
let animation = setInterval(drawMatrix, 45);
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector("h3")?.textContent;

        if (title) {
            alert("Вы открыли раздел: " + title);
        }
    });
});
