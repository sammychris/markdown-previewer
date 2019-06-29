import React from 'react';
import './App.scss';
import ReactMarkdown from 'react-markdown';

class Previewer extends React.Component {
  constructor(props){
    super(props);
  }
    render(){
    let iconClass = 'fa fa-arrows-alt';
    let styles = { maxWidth: '700px' }
    
    if(this.props.enlarge) {
      iconClass = 'fa fa-compress';
      styles = { maxWidth: 'none' }
    }
      return(
        <div id="previewRight" style={styles}>
          <div className="title">
            <span>Preview</span><i onClick={this.props.max} className={iconClass}></i>
          </div>
          <div id="preview">
            <ReactMarkdown source={this.props.text}/>
          </div>
        </div>
      )
    }
}

class Markdown extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let iconClass = 'fa fa-arrows-alt';
    let styles = {
      editorLeft: {height:'230px'},
      leftNav: {maxWidth: '480px'},
    }
    
    if(this.props.enlarge) {
      iconClass = 'fa fa-compress';
      styles = {
        editorLeft: { height:'500px'},
        leftNav: { maxWidth: 'none', position: 'absolute', top:'30px'}
      }
    }
    return(
      <div style={styles.leftNav} id="leftNav">
        <div style={styles.editorLeft}id="editorLeft">
          <div className="title">
            <span>Editor</span><i onClick={this.props.max} className={iconClass}></i>
          </div>
          <textarea id='editor' onChange={this.props.handleChange}>{this.props.input}</textarea>
        </div>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      input: Placeholder,
      editorMax: false,
      previewerMax: false
    }
    this.editor = this.editor.bind(this);
    this.previewer = this.previewer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  editor(){
    this.setState({
      editorMax: !this.state.editorMax
    });
  }
  previewer(){
    this.setState({
      previewerMax: !this.state.previewerMax
    });
  }
  render(){
    const Editor = <Markdown enlarge={this.state.editorMax} handleChange={this.handleChange} input={this.state.input} max={this.editor}/>
    const Preview = <Previewer enlarge={this.state.previewerMax} text={this.state.input} max={this.previewer}/>
          
    if(this.state.editorMax) return ( <div id="content">{Editor}</div> );
    if(this.state.previewerMax) return ( <div id="content">{Preview}</div> );
    return (  <div id="content">{Editor} {Preview}</div> );
  }
}

const Placeholder =
`# Welcome to my React Markdown Previewer!

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

There's also [links](https://www.freecodecamp.com), and
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


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

export default App;
