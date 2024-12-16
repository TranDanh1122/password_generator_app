const [inputEL, rangeEL] = ["range", "range_text"].map((id) => document.getElementById(id));

let hanldeRange = (e) => {
    const value = e.target.value;
    const perccent = (value / 20) * 100;
    e.target.style.background = `linear-gradient(to right, var(--neon_green) ${perccent}%, var(--very_dark_grey) ${perccent}%)`;
    rangeEL.textContent = value
}
inputEL.addEventListener('input', hanldeRange);