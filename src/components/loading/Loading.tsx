// Libraries
import React, {useEffect } from "react";
// Styling
import './Loading.scss'

function Loading() {

	useEffect(() => {
		const checkbox = document.getElementById('checkBox')
		checkbox.setAttribute('checked','')
	}, [])

	return (
		<div className="loadingWrapper">
			<div className="power-switch animate-ping">
				<input id="checkBox" type="checkbox" />
				<div className="button">
					<svg className="power-on">
						<use href="#line" className="line" />
						<use href="#circle" className="circle" />
					</svg>
				</div>
			</div>


			<svg className="loadingSVG" xmlns="http://www.w3.org/2000/svg">
				<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="line">
					<line x1="75" y1="34" x2="75" y2="58" />
				</symbol>
				<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="circle">
					<circle cx="75" cy="80" r="35" />
				</symbol>
			</svg>
		</div>
	);
}

export default Loading;
