import Markdown from 'markdown-to-jsx';
import React, { Component } from 'react';
import README from './README.md';

class Readme extends Component {

    state = { md: "null" }

    componentWillMount() {
        fetch(README)
            .then((res) => res.text())
            .then((incomingMdText) => {
                console.log(incomingMdText);
                this.setState({ md: incomingMdText })
            })
    }

    render() {

        return (
            <div style={{margin: '5% 5% 5%'}} >
                <Markdown>{this.state.md}</Markdown>
            </div>
        );
    }
}

export default Readme;