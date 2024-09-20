import { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown to render markdown
import Toggle from '../Toggle/Toggle';
import TextArea from '../../components/TextArea/TextArea';
import ButtonTool from '../ui/Buttons/ButtonTool';
import { BiBold, BiItalic, BiHeading, BiLink, BiListUl} from "react-icons/bi";
import "./MarkdownEdit.css";
function MarkdownEdit() {
  const [mode, setMode] = useState('edit');
  const [text, setText] = useState('');

  const insertMarkdown = (start, end = '') => {
    const selectionStart = document.getElementById('editor').selectionStart;
    const selectionEnd = document.getElementById('editor').selectionEnd;
    const selectedText = text.substring(selectionStart, selectionEnd);
    const replacement = start + selectedText + end;
    const newText = text.substring(0, selectionStart) + replacement + text.substring(selectionEnd);
    setText(newText); // Update the text state with the new markdown
    setTimeout(() => {
      const textarea = document.getElementById('editor');
      textarea.focus();
      textarea.setSelectionRange(selectionStart + start.length, selectionEnd + start.length);
    }, 0);
  };

  return (
    <div className="main-container-markdown">
      <div className="container-markdown">
        <div className="tools-buttons">
          <ButtonTool onClick={() => insertMarkdown('**', '**')}>
            <BiBold/>
          </ButtonTool>
          <ButtonTool  onClick={() => insertMarkdown('*', '*')}>
            <BiItalic/>
          </ButtonTool>
          <ButtonTool onClick={() => insertMarkdown('### ')}>
            <BiHeading />
          </ButtonTool>
          <ButtonTool onClick={() => insertMarkdown('[', '](url)')}>
            <BiLink/>
          </ButtonTool>
          <ButtonTool onClick={() => insertMarkdown('- ')}>
            <BiListUl />
          </ButtonTool>
        </div>
        <Toggle
          aria-label="Toggle edit/preview mode"
          pressed={mode === 'preview'}
          onPressedChange={(pressed) => setMode(pressed ? 'preview' : 'edit')}
        >
          {mode === 'edit' ? <button className="toggle-1" /> : <button className="toggle-2" />}
        </Toggle>
      </div>

      {mode === 'edit' ? (
        <TextArea
          id="editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe"
          className="text-area-markdown"
        />
      ) : (
        <div className="prose dark:prose-invert max-w-none border rounded-md p-4 min-h-[300px]">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default MarkdownEdit;