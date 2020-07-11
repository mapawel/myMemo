import {
    notesDB
} from '../script.js'

export const myRestorePanelOB = document.querySelector('my-restore-panel');

const restorePanelTemplate = document.createElement('template');
restorePanelTemplate.innerHTML = `
<link rel="stylesheet" href="myRestorePanel/myRestorePanel.css">
<style>
</style>

<div class="restore-panel">
<h2 id="restorePanelHeader">Zaznacz elementy do przywrócenia</h2>
<div class='notes-to-restore'>
</div>
<div class="panel-buttons">
<button id="restore" class="restore icon"><i class="fa fa-save"></i> Przywróć</button>
<button id="closeRestore" class="cancel icon"><i class="fa fa-times"></i> Anuluj</button>
</div>
</div>
`;


export class MyRestorePanel extends HTMLElement {
    static get observedAttributes() {
        return ['display'];
    }

    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(restorePanelTemplate.content.cloneNode(true));

        const restoreBtn = this.shadowRoot.querySelector('#restore');
        const closeRestoreBtn = this.shadowRoot.querySelector('#closeRestore');
        const closeRestorePanel = () => this.setAttribute('display', '0');

        restoreBtn.addEventListener('click', () => {
            this.shadowRoot.querySelectorAll('[toRestore = true]').forEach(note => {
                note.status = 'restored'
                note.removeAttribute('toRestore');
            });
            this.dispatchEvent(new CustomEvent('myRestorePanel', {
                bubbles: true,
                composed: true,
                detail: {
                    fooInit: 'restoreChosenNotes'
                }
            }))
            closeRestorePanel();
            notesDB.forEach(note => note.onclick = false);
        });

        closeRestoreBtn.addEventListener('click', () => {
            this.shadowRoot.querySelectorAll('[toRestore = true]').forEach(note => note.removeAttribute('toRestore'));
            closeRestorePanel();
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let showRestorePanel = (this.getAttribute('display') == 1) ? 'flex' : 'none';
        this.shadowRoot.querySelector('style').innerText = `
        .restore-panel {
            display: ${showRestorePanel};
        }`;

        function choseToRestore() {
            if (this.getAttribute('toRestore')) {
                this.setAttribute('animated', true);
                this.shadowRoot.querySelector('.note').style.boxShadow = '0 0 0 grey';
                this.shadowRoot.querySelector('.note').style.opacity = '1';
                this.removeAttribute('toRestore');
            } else {
                this.setAttribute('animated', false);
                this.shadowRoot.querySelector('.note').style.boxShadow = '0 0 8px grey';
                this.shadowRoot.querySelector('.note').style.opacity = '.6';
                this.setAttribute('toRestore', true)
            }
        }

        (async () => {
            await customElements.whenDefined(myRestorePanelOB.localName);
            this.shadowRoot.querySelectorAll('note-element').forEach(note => note.remove());

            if (notesDB.filter(note => note.status == 'deleted').length == 0) {
                this.shadowRoot.querySelector('#restorePanelHeader').innerText = 'brak notatek w koszu';
                this.shadowRoot.querySelector('#restore').style.display = 'none';
                this.shadowRoot.querySelector('#closeRestore').innerText = 'OK';
            } else {
                this.shadowRoot.querySelector('#restorePanelHeader').innerText = 'Zaznacz elementy do przywrócenia';
                this.shadowRoot.querySelector('#restore').style.display = 'inline-block';
                this.shadowRoot.querySelector('#closeRestore').innerText = 'Anuluj';
            };

            notesDB
                .filter(note => note.status == 'deleted')
                .forEach(note => {
                    this.shadowRoot.querySelector('.notes-to-restore').appendChild(note);
                    note.shadowRoot.querySelector('button#editNote').style.display = 'none';
                    note.shadowRoot.querySelector('button#delNote').style.display = 'none';
                    note.onclick = choseToRestore;
                    note.shadowRoot.querySelector('.note').style.cursor = 'pointer';
                });
        })();

    }
}
customElements.define('my-restore-panel', MyRestorePanel);