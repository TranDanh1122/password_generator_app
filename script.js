let formPassword = document.getElementById("form_password")
let passwordEl = document.getElementById("password")
let statusEl = document.getElementById('status')
let copyBtn = document.getElementById('copy')
let copyMessage = document.getElementById("copied")
let getRandomChar = (arr) => arr[Math.floor(Math.random() * arr.length)]
let corePassword = {
    upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowerCase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    baseChar: "",
    result: "",
    secureLevel: {
        0: { "too_weak": "Too weak!" },
        1: { "too_weak": "Too weak!" },
        2: { "weak": "Weak" },
        3: { "medium": "Medium" },
        4: { "strong": "Strong" }
    },
    resetData: function () {
        this.baseChar = ""
        this.result = ""
    },
    getSecureLevel: function () {
        let options = document.querySelectorAll("input[type='checkbox']:checked")
        let numberOfRule = options.length
        return this.secureLevel[numberOfRule]
    },
    generate: function (rules) {
        this.resetData()
        this.addUpper()
        if (rules.lowercase) this.addLower()
        if (rules.number) this.addNumbers()
        if (rules.symbols) this.addSymbols()
        for (let i = this.result.length; i < rules.noc; i++) {
            this.result += getRandomChar(this.baseChar);
        }
        return this.result.split('').sort(() => Math.random() - 0.5).join('');
    },
    addUpper: function () {
        this.baseChar += this.upperCase
        this.result += getRandomChar(this.upperCase);
    },
    addLower: function () {
        this.baseChar += this.lowerCase
        this.result += getRandomChar(this.lowerCase);
    },
    addNumbers: function () {
        this.baseChar += this.numbers
        this.result += getRandomChar(this.numbers);
    },
    addSymbols: function () {
        this.baseChar += this.symbols
        this.result += getRandomChar(this.symbols);
    }
}

let hanldeGeneratePass = (e) => {
    e.preventDefault()
    let formData = Object.fromEntries(new FormData(formPassword));
    let password = corePassword.generate(formData)
    let secureLevel = corePassword.getSecureLevel();
    statusEl.setAttribute("secureLevel", Object.keys(secureLevel)[0] ?? '')
    statusEl.querySelector("#status_message").textContent = Object.values(secureLevel)[0] ?? ''
    passwordEl.value = password
    copyMessage.removeAttribute('active')
}
let handleCopy = (e) => {
    navigator.clipboard.writeText(passwordEl.value)
        .then(() => {
            copyMessage.setAttribute('active', true)
        })
}
formPassword.addEventListener('submit', hanldeGeneratePass)
copyBtn.addEventListener('click', handleCopy)

