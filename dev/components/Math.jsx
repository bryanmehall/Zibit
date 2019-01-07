import React from "react"

import katex from "katex"


const Math = (props) => {
     const html = katex.renderToString(props.tex, {
            throwOnError: false,
            displayMode: props.displayMode === undefined ? true : false
        })
        return <div style={{
                fontSize: 24,
                padding: "-50px",
                margin: "0px",
                opacity: props.visibility,
                filter:props.visibility >= 1 ? "none" : `blur(${9-10*props.visibility}px)`,
                //backgroundColor: 'blue',
                ...props.style}}dangerouslySetInnerHTML={{ __html: html }}
                ></div>
}
export default Math
