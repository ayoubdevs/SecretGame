let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 5;
let lastHelpTime = 0;
let helpCooldown = 3600 * 1000;

function checkNumber() {
    let guess = parseInt(document.getElementById("guess").value);
    let message = document.getElementById("message");
    let remainingAttempts = document.getElementById("remaining");

    if (attemptsLeft > 0) {
        if (guess === secretNumber) {
            message.innerHTML = "🎉 مبروك! لقد خمنت الرقم الصحيح!";
            disableGame();
        } else {
            attemptsLeft--;
            if (attemptsLeft === 0) {
                message.innerHTML = `😢 خسرت! الرقم الصحيح كان ${secretNumber}`;
                disableGame();
            } else {
                message.innerHTML = guess > secretNumber ? "📉 الرقم أصغر!" : "📈 الرقم أكبر!";
            }
        }
        remainingAttempts.textContent = attemptsLeft;
    }
}

function getHint() {
    let hintMessage = document.getElementById("hintMessage");
    let now = new Date().getTime();

    if (now - lastHelpTime < helpCooldown) {
        let timeLeft = Math.ceil((helpCooldown - (now - lastHelpTime)) / 60000);
        hintMessage.innerHTML = `⏳ انتظر ${timeLeft} دقيقة للمساعدة!`;
    } else {
        lastHelpTime = now;
        let hint = (secretNumber % 2 === 0) ? "🔍 الرقم زوجي!" : "🔍 الرقم فردي!";
        hintMessage.innerHTML = hint;
        document.getElementById("helpBtn").classList.add("disabled");
    }
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 5;
    document.getElementById("message").innerHTML = "🎯 حاول مرة أخرى!";
    document.getElementById("remaining").textContent = attemptsLeft;
    document.getElementById("hintMessage").innerHTML = "";
    document.getElementById("helpBtn").classList.remove("disabled");
}

function disableGame() {
    document.querySelector(".guess-btn").disabled = true;
    document.querySelector(".help-btn").disabled = true;
}