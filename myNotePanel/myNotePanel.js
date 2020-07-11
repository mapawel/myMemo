const notePanelTemplate = document.createElement('template');
notePanelTemplate.innerHTML = `
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="myNotePanel/myNotePanel.css">
    <style></style>
    <div class="note-panel">
        <h2>Dodaj notatkę</h2>
        <label for="category">Wybierz kategorię</label>
        <select id="category">
            <option value="0" disabled selected>- wybierz kategorię -</option>
            <option value="1">Zakupy</option>
            <option value="2">Praca</option>
            <option value="3">Dom</option>
            <option value="4">Rodzina</option>
            <option value="5">Inne</option>
        </select>

        <label for="text">Wpisz treść notatki</label>
        <textarea id="text"></textarea>

        <p class="error">Uzupełnij wszystkie pola!</p>

        <div class="panel-buttons">
            <button id="saveNote" class="save icon"><i class="fa fa-save"></i> Zapisz</button>
            <button id="closeNotePanel" class="cancel icon"><i class="fa fa-times"></i> Anuluj</button>
        </div>
    </div>
`;

export const myNotePanel = customElements.define('my-note-panel', class extends HTMLElement {
    static get observedAttributes() {
        return ['display'];
    }

    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(notePanelTemplate.content.cloneNode(true));

        const saveBtn = this.shadowRoot.querySelector('#saveNote');
        const cancelBtn = this.shadowRoot.querySelector('#closeNotePanel');
        const catergorySelector = this.shadowRoot.querySelector('select#category');
        const noteTextArea = this.shadowRoot.querySelector('textarea#text');
        const errMessege = this.shadowRoot.querySelector('.error');

        const cleanPanel = () => {
            catergorySelector.value = 0;
            noteTextArea.value = '';
        }

        saveBtn.addEventListener('click', function () {
            errMessege.style.visibility = 'hidden';
            if (catergorySelector.value > 0 && noteTextArea.value) {
                this.dispatchEvent(new CustomEvent('myNotePanel', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        fooInit: this.getAttribute('id'),
                        cat: catergorySelector.options[catergorySelector.selectedIndex].text,
                        cid: catergorySelector.value,
                        txt: noteTextArea.value
                    }

                }))
                cleanPanel();
            } else errMessege.style.visibility = 'visible';
        })

        cancelBtn.addEventListener('click', function () {
            errMessege.style.visibility = 'hidden';
            this.dispatchEvent(new CustomEvent('myNotePanel', {
                bubbles: true,
                composed: true,
                detail: {
                    fooInit: this.getAttribute('id')
                }
            }))
            cleanPanel();
        })

    }

    attributeChangedCallback(name, oldValue, newValue) {
        const style = this.shadowRoot.querySelector('style')
        if (newValue == 1) {
            style.innerText = `.note-panel {display: flex;}`
        } else {
            style.innerText = `.note-panel {display: none;}`
        }
    }


});

export const myNotePanelOB = document.querySelector('my-note-panel');