import React from "react";
class Expression extends React.Component{//should this be textbox??
	constructor(props){
		super(props)
		this.offsets = []
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
		function getWidth(width, index){//allow child to pass width to parent
			console.log('gotWidth', index, width)
			newChildren[index].props.pos.x = currentWidth
			exp.offsets.push(currentWidth)
			currentWidth+=width
			if (len-1 === index){
				newChildren.reverse()
				console.log('newChildren', newChildren)
			}
		}

		newChildren = children.map(function(child,i){
			console.log('setting offsets')
			return React.cloneElement(child, { key:i, index:i, pos:{x:exp.offsets[i], y:exp.props.pos.y}, getWidth:getWidth})
		})
		console.log('rendering', newChildren)
		return (//render children with refs first
			<g>
				<g x={this.props.pos.x} y={this.props.pos.y}  ref='expression'>
					{newChildren}
				</g>
			</g>
		)
	  }
}

export default Expression;
