/**
 * BPM Counter | counter script
 */

const bpmValueDisplay = document.getElementById("bpmValueDisplay");

const startText = document.getElementById("startText");
const descriptionText = document.getElementById("descriptionText");

let lastTimestamps = [];
let roundedBpmValue = 0;

function calcAvgClickTime() {
    let intervals = [];

    for (let t = 0; t < lastTimestamps.length - 1; t++) {
        let olderTimestamp = lastTimestamps[t];
        let newerTimestamp = lastTimestamps[t + 1];

        const diffSecs = (newerTimestamp - olderTimestamp) / 1000;

        intervals.push(diffSecs);
    }

    const intervalsSum = intervals.reduce((pv, cv) => pv + cv, 0);
    const avgInterval = intervalsSum / intervals.length;

    return avgInterval;
}

function renderResult(bpmValue) {
    bpmValueDisplay.innerText = bpmValue;
}

function triggerAvgTimeUpdate() {
    if (lastTimestamps.length < 2) {
        return;
    }

    firstClick();

    const avgClickTime = calcAvgClickTime();
    const bpmValue = 60 / avgClickTime;

    roundedBpmValue = Math.round(bpmValue);

    renderResult(roundedBpmValue);
}

function firstClick() {
    startText.style.display = "none";
    descriptionText.style.display = "inherit";
}

function resetCounter() {
    lastTimestamps = [];
    roundedBpmValue = 0;
    bpmValueDisplay.innerText = "...";
}

function copyToClipboard() {
    navigator.clipboard.writeText(roundedBpmValue);
}

document.addEventListener("keydown", (ev) => {
    switch (ev.code) {
        case "KeyR":
            resetCounter();
            break;
        case "KeyC":
            copyToClipboard();
            break;
        default:
            lastTimestamps.push(new Date());

            triggerAvgTimeUpdate();
            break;
    }
});
