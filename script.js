const buttons = [...document.querySelectorAll('.buttons button')];
const screen = document.querySelector('.screen');

function isOperator(char) {
    return ['+', '-', '*', '/', '.'].includes(char);
}

function handleInput(value, key) {
    if (key === "back") {

        screen.textContent = screen.textContent.slice(0, -1);
    } else if (key === "8" || value === "C") {
        // Clear screen
        screen.textContent = "";
    } else if (key === "13" || value === "=") {
        // Evaluate expression
        try {
            if (screen.textContent.trim() === "") return;
            // Only allow numbers, operators, parentheses, and dots
            if (!/^[0-9+\-*/().\s]+$/.test(screen.textContent)) {
                alert("Invalid input!");
                return;
            }
            // Use BigInt for large integer calculations if possible
            if (/^\d+(\*\d+)+$/.test(screen.textContent.replace(/\s+/g, ''))) {
                // Only multiplication of integers
                let parts = screen.textContent.split('*').map(s => s.trim());
                let result = BigInt(parts[0]);
                for (let i = 1; i < parts.length; i++) {
                    result *= BigInt(parts[i]);
                }
                screen.textContent = result.toString();
            } else {
                // Standard eval for other expressions
                screen.textContent = eval(screen.textContent);
            }
        } catch (e) {
            alert("Calculation error: " + e.message);
        }
    } else {
        // Prevent double operators
        const lastChar = screen.textContent.slice(-1);
        if (isOperator(lastChar) && isOperator(value)) return;
        screen.textContent += value;
    }
}

// Button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => handleInput(button.textContent, button.dataset.key));
});

// Keyboard input
document.addEventListener('keydown', (e) => {
    const key = e.key;
    const keyMap = {
        "0": "96", "1": "97", "2": "98", "3": "99", "4": "100", "5": "101", "6": "102", "7": "103",
        "8": "104", "9": "105", "+": "107", "-": "109", "*": "106", "/": "111", ".": "110",
        "Enter": "13", "c": "8", "C": "8", "(": "53", ")": "219", "=": "13", "Backspace": "back"
    };
    if (keyMap[key] || keyMap[key] === "0") handleInput(key, keyMap[key]);
});

// Scatter symbols randomly
const symbols = document.querySelectorAll('.math-symbols span');
symbols.forEach(symbol => {
    symbol.style.top = Math.random() * 100 + 'vh';
    symbol.style.left = Math.random() * 100 + 'vw';
    symbol.style.fontSize = (Math.random() * 40 + 20) + 'px';
    symbol.style.animationDuration = (Math.random() * 10 + 8) + 's';
    symbol.style.animationDelay = Math.random() * 10 + 's';
});
