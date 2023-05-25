import React, { useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function OrderFiles() {
	const dragItem = useRef();
	const dragOverItem = useRef();
	const [list, setList] = useState([
		"Item 1",
		"Item 2",
		"Item 3",
		"Item 4",
		"Item 5",
		"Item 6",
	]);


	const dragStart = (e, position) => {
		dragItem.current = position;
		console.log(e.target.innerHTML);
	};

	const dragEnter = (e, position) => {
		dragOverItem.current = position;
		console.log(e.target.innerHTML);
	};
	const drop = (e) => {
		const copyListItems = [...list];
		const dragItemContent = copyListItems[dragItem.current];
		copyListItems.splice(dragItem.current, 1);
		copyListItems.splice(dragOverItem.current, 0, dragItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		setList(copyListItems);
	};
	return (
		<div className="d-flex">
			{list &&
				list.map((item, index) => (
					<div
						style={{
							backgroundColor: "lightblue",
							margin: "2px",
							// textAlign: "center",
							fontSize: "20px",
							
						}}
						onDragStart={(e) => dragStart(e, index)}
						onDragEnter={(e) => dragEnter(e, index)}
						onDragEnd={drop}
						key={index}
						draggable
					>
						<>{item}</>
					</div>
				))}
		</div>
	);
}
