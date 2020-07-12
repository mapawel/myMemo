const menuTemplate = document.createElement('template');
menuTemplate.innerHTML = `
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="myMenu/myMenuSmall.css">
    <link rel="stylesheet" media='screen and (min-width: 992px)' href="myMenu/myMenu.css">

    <div class="menu">
        <div class="wrapper">
            <h1><i class="fa fa-lightbulb-o"></i> myMemo</h1>
            <div class="menu-buttons">
                <button id="addNote" class="add icon"><i class="fa fa-plus"></i> DODAJ</button>
                <button id="delAll" class="delete-all icon"><i class="fa fa-times"></i> WSZYSTKO DO KOSZA</button>
                <button id="restore" class="restore-chosen icon"><i class="fa fa-reply-all"></i> PRZYWRÓĆ Z KOSZA</button>
                <button id="openReset" class="reset icon"><i class="fa fa-exclamation-triangle"></i> RESET</button>
                <button id="help" class="help icon"><i class="fa fa-question"></i></button>
            </div>
            <button id="color" class="color icon">
            <p>mode <i>DARK</i></p>
            <div class="switcher">
                <div class="knob">
                </div>
            </div>
            </button>
            <button id="menuBurger" class="burger"><span></span><span></span><span></span></button>
        </div>
    </div>
`;

export const myMenu = customElements.define('my-menu', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(menuTemplate.content.cloneNode(true));

        const btns = this.shadowRoot.querySelectorAll('button');
        btns.forEach(btn => btn.addEventListener('click', function () {
            this.dispatchEvent(new CustomEvent('myMenuEvent', {
                bubbles: true,
                composed: true,
                detail: {
                    fooInit: this.getAttribute('id')
                }
            }))
        }))
    }
});