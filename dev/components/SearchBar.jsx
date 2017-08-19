import React from 'react'

const SearchBar = () => {
	return (
		<input
			style = {{
				display:'block',
				margin:'auto',
				marginTop: "40px",
				border:'none',
				outlineColor:'#889',
				fontSize:30,
				color:'#889',
				textAlign:'center',
				fontFamily:'Roboto Condensed, sans-serif',
				padding:'0 40 0 40', //trbl
				minWidth:"400px",
				backgroundColor:'#404048',
				height:50,
				width:"60%"
			}}
			>
		</input>)
}
export default SearchBar
