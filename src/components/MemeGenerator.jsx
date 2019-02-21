import React, { Component } from 'react';

class MemeGenerator extends Component {
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg:"https://i.imgflip.com/2tne80.gif",
            allMemeImgs: [],
            imageNumState: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePage = this.handlePage.bind(this)
    }

    componentWillMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then( response => response.json() )
        .then( response => {
            const { memes } = response.data
            console.log(memes[0])
            this.setState({allMemeImgs:memes})
        })

    }

    handleChange(e){
        const { name, value } = e.target
        this.setState({
            [name] : value
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
    }

    handlePage(e){
        const {name} = e.target
        console.log(name)
        const imageNum = name === "next" ? Math.abs( this.state.imageNumState + 1 ) : Math.abs( this.state.imageNumState - 1 ) 
        const memeImg = this.state.allMemeImgs[imageNum].url
        this.setState({
            randomImg: memeImg,
            imageNumState: imageNum
        })
    }

    render() { 
        return ( <div>
                    <form className = "meme-form" onSubmit={this.handleSubmit} >
                        <input className="button" name="prev" type="button" value="PREV" onClick={this.handlePage} />
                        <input placeholder="TOP TEXT" type="text" name="topText" value={ this.state.topText } onChange={this.handleChange} />
                        <input placeholder="BOTTOM TEXT" type="text" name="bottomText" value={ this.state.bottomText } onChange={this.handleChange} />
                        <input className="button" name="next" type="button" value="NEXT" onClick={this.handlePage} />
                    </form>
                    <div className="meme" >
                        <img src={this.state.randomImg} alt="" />
                        <h2 className="topText" >{this.state.topText}</h2>
                        <h2 className="bottomText" >{this.state.bottomText}</h2>
                    </div>
                </div> );
    }
}
 
export default MemeGenerator;