const head = document.querySelector('head')
const body = document.querySelector('body')

// mocha CSS link
const mochaCSSPath = "https://cdnjs.cloudflare.com/ajax/libs/mocha/8.3.2/mocha.min.css"
const mochaCSSLinkEl = document.createElement('link')
mochaCSSLinkEl.rel = 'stylesheet'
mochaCSSLinkEl.href = mochaCSSPath
head.prepend(mochaCSSLinkEl)

// custom styles for mocha runner
const mochaStyleEl = document.createElement('style')
mochaStyleEl.innerHTML =
  `#mocha {
    font-family: sans-serif;
    position: fixed;
    overflow-y: auto;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 48px 0 96px;
    background: white;
    color: black;
    display: none;
    margin: 0;
  }
  #mocha * {
    letter-spacing: normal;
    text-align: left;
  }
  #mocha .replay {
    pointer-events: none;
  }
  #mocha-test-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 1001;
    background-color: #007147;
    border: #009960 2px solid;
    color: white;
    font-size: initial;
    border-radius: 4px;
    padding: 12px 24px;
    transition: 200ms;
    cursor: pointer;
  }
  #mocha-test-btn:hover:not(:disabled) {
    background-color: #009960;
  }
  #mocha-test-btn:disabled {
    background-color: grey;
    border-color: grey;
    cursor: initial;
    opacity: 0.7;
  }`
head.appendChild(mochaStyleEl)

// mocha div
const mochaDiv = document.createElement('div')
mochaDiv.id = 'mocha'
body.appendChild(mochaDiv)

// run tests button
const testBtn = document.createElement('button')
testBtn.textContent = "Loading Tests"
testBtn.id = 'mocha-test-btn'
testBtn.disabled = true
body.appendChild(testBtn)

const scriptPaths = [
  "https://cdnjs.cloudflare.com/ajax/libs/mocha/8.3.2/mocha.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/chai/4.3.4/chai.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/sinon.js/10.0.1/sinon.min.js",
  // "jsdom.js" // npx browserify _jsdom.js --standalone JSDOM -o jsdom.js
]
const scriptTags = scriptPaths.map(path => {
  const scriptTag = document.createElement('script')
  scriptTag.type = 'text/javascript'
  scriptTag.src = path
  return scriptTag
})

let loaded = 0
if (localStorage.getItem('test-run')) {
  // lazy load test dependencies
  scriptTags.forEach(tag => {
    body.appendChild(tag)
    tag.onload = function () {
      if (loaded !== scriptTags.length - 1) {
        loaded++
        return
      }
      testBtn.textContent = 'Run Tests'
      testBtn.disabled = false
      testBtn.onclick = __handleClick
      runTests()
    }
  })
} else {
  testBtn.textContent = 'Run Tests'
  testBtn.disabled = false
  testBtn.onclick = __handleClick
}

function __handleClick() {
  if (!localStorage.getItem('test-run') && this.textContent === 'Run Tests') {
    localStorage.setItem('test-run', true)
  } else {
    localStorage.removeItem('test-run')
  }
  window.location.reload()
}

function runTests() {
  testBtn.textContent = 'Running Tests'
  testBtn.disabled = true
  mochaDiv.style.display = 'block'
  body.style.overflow = 'hidden'

  mocha.setup("bdd");
  const expect = chai.expect;

  describe("CSS Form Practice", function () {
    const numInput = document.querySelector('form input[type=number]')
    const textInput = document.querySelector('form input[type=text]')
    const getH1Styles = () => getComputedStyle(document.querySelector('h1'))
    const formButton = document.querySelector('form button:not([type=button])')
    const submitForm = () => formButton.click()
    before(() => {
      document
        .querySelector('form')
        .addEventListener('submit', e => e.preventDefault())
    })
    afterEach(sinon.restore)
    after(() => {
      testBtn.disabled = false
      testBtn.textContent = 'Close Tests'
    })
    describe('form setup', () => {
      it('should have number input and text input', () => {
        expect(numInput).to.exist
        expect(textInput).to.exist
      })
      it('should have name attributes for number input and text input', () => {
        expect(numInput.name).to.exist
        expect(textInput.name).to.exist
      })
      it('should have placeholder attribute for number input and text input', () => {
        expect(textInput.placeholder).to.exist
        expect(numInput.placeholder).to.exist
      })
      it('should have step="8" attribute for number input', () => {
        expect(numInput.step).to.eq('8')
      })
      it('should have min="0" attribute for number input', () => {
        expect(numInput.min).to.eq('0')
      })
      it('should have label element that match the number input and text input', () => {
        const labels = document.querySelectorAll('form label')
        expect(labels.length).to.eq(2)
        const matchingLabels = Array.from(labels).filter(label => {
          const forAttr = label.getAttribute('for')
          return  forAttr=== numInput.id || forAttr === textInput.id
        })
        expect(matchingLabels.length).to.eq(2)
      })
    })
    describe("form submit", () => {
      let submitStub
      beforeEach(() => {
        submitStub = sinon.stub()
        document
          .querySelector('form')
          .addEventListener('submit', submitStub)
      })
      it('form should fire submit event when submit button is clicked', () => {
        submitForm()
        expect(submitStub.called).to.be.true
      })
      it('should set the font color', () => {
        const color = 'red'
        textInput.value = color
        submitForm()
        expect(submitStub.called).to.be.true
        expect(getH1Styles().color).to.eq('rgb(255, 0, 0)')
      })
      it('should set the font size', () => {
        const size = '80'
        numInput.value = size
        submitForm()
        expect(submitStub.called).to.be.true
        expect(getH1Styles().fontSize).to.eq(size + 'px')
      })
    })
  });

  mocha.run();
}