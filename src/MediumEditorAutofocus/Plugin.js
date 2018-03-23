import MediumEditor from 'medium-editor';

const MediumEditorAutofocus = MediumEditor.Extension.extend({
  name: 'autofocus',

  init() {
    if (this.getEditorElements().length < 1) {
      return;
    }

    if(!this.getEditorElements()[0].children.length) {
      this.getEditorElements()[0].focus();
    } else {
      this.base.selectElement(this.getEditorElements()[0].children[0]);

      // solves a bug with Safari
      if (document.getSelection().type !== 'None') {
        MediumEditor.selection.clearSelection(document, true);
      }
    }
  }
});

export default MediumEditorAutofocus;
