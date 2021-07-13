import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import {Provider, connect} from "react-redux";
import ReactMarkdown from "react-markdown";
import './index.css';

//Redux:
const defaultInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const addInput = (string) => {
    return {
        type: 'CHANGE',
        input: string
    };
};

const inputReducer = (state = defaultInput, action) => {
    if (action.type === 'CHANGE') return action.input;
    else return state;
};

const store = createStore(inputReducer);

const mapStateToProps = (state) => {
    return {input: state};
}

const mapDispatchToProps = (dispatch) => {
    return (
        {
            sendInput: (input) => {
                dispatch(addInput(input));
            }
        }
    )
}


//React:
class Editor extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange(event) {
        this.props.sendInput(event.target.value);
    }
    render() {
        return (
            <div id="editor-section">
                <div className="status-bar">
                    <div>Editor</div>
                    <i className="fas fa-expand-arrows-alt"/>
                </div>
                <textarea id="editor" value={this.props.input} onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

class Previewer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="previewer">
                <div className="status-bar">
                    <div>Previewer</div>
                    <i className="fas fa-expand-arrows-alt"/>
                </div>
                <div id="preview">
                    <ReactMarkdown children={this.props.input}/>
                </div>

            </div>
        )
    }
}

//redux to react:
const ContainerEditor = connect(mapStateToProps, mapDispatchToProps)(Editor);
const ContainerPreviewer = connect(mapStateToProps, mapDispatchToProps)(Previewer);

ReactDOM.render(
    <Provider store={store}>
        <ContainerEditor/>
        <ContainerPreviewer/>
    </Provider>,
    document.getElementById('root')
)

