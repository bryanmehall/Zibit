import React from "react";
class Expression extends React.Component{//should this be textbox??
	constructor(props){
		super(props)
		this.offsets = []
	}
	componentWillMount(){
		console.log('expression will mount', this.props.children)
	}
	componentDidMount(){
		console.log('expression did mount')
	}

	render(){
		var exp = this
		var children = this.props.children || [],
			len = children.length,
			newChildren,
			pos = this.props.pos,
			currentWidth = pos.x
		if (children.length === 1){
			children = [children]
		}
		console.log(children)


		function getWidth(width, index){//allow child to pass width to parent
			console.log('gotWidth', index, width)
			newChildren[index].props.pos.x = currentWidth
			exp.offsets.unshift(currentWidth)
			currentWidth+=width
		}

		newChildren = []
		//for (var i= children.length-1; i>=0; i--){
			//var child = children[i]
		children.forEach(function(child,i){
			var element = React.cloneElement(child, { key:child.key, index:i, pos:{x:exp.offsets[children.length-i-1], y:exp.props.pos.y}, getWidth:getWidth})
			newChildren.unshift(element)
		})
		console.log('renderng expression', newChildren)
		return (//render children with refs first
			<g>
				<text x={this.props.pos.x} y={this.props.pos.y}  ref='expression'>
					{newChildren}
				</text>
			</g>
		)
	  }
}

export default Expression;
