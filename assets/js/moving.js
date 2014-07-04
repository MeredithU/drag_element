/* These variables determine the new location of the moving image */
var moveObject = null; //Object to be moved
var moving = false; // Is the mouse currently moving
var lastZindex = 0; // To ensure the dragged element will be at the front of all other objects

/* Top left x & y coordinates of the photo after it's clicked */
var elementXCoord;
var elementYCoord;

/********************************************************************  
		This function will load the boxes onto the page. 
		The prepareMove function is assigned to the mousedown event.
********************************************************************/

function moveInit() {
	var photoGrid = document.getElementById("photoLayout");

	var newGreenBox = document.createElement("li");
	newGreenBox.className = "block green";
	newGreenBox.onmousedown = prepareMove;

	var newOrangeBox = document.createElement("li");
	newOrangeBox.className = "block orange";
	newOrangeBox.onmousedown = prepareMove;
	
	photoGrid.appendChild(newOrangeBox);
	photoGrid.appendChild(newGreenBox);
}

/******************************************************************** 
		This function is called once a user clicks down on a square. 
		The moveElement function is triggered once the user starts 
		moving the square around.
********************************************************************/

function prepareMove(event) {
	event.preventDefault();

	if (!moving) {
		moveObject = event;

		elementXCoord = moveObject.pageX - moveObject.currentTarget.offsetLeft;
		elementYCoord = moveObject.pageY - moveObject.currentTarget.offsetTop;

		moveObject.currentTarget.onmousemove = moveElement;
		moveObject.currentTarget.onmouseup = stopMove;

		moving = true;
	} else {
		moving = false;
	}
}

/******************************************************************** 
		This function is called when the user is moving the square around. 
		It first finds the x & y mouse coordinates and calculates the
		new position of the moving image.  
********************************************************************/

function moveElement(event) {
	moveObject = event;
	var movingImage = moveObject.target;

	var mouseXCoord = moveObject.pageX; // x coordinate of mouse as it moves
  var mouseYCoord = moveObject.pageY; //y coordinate of mouse as it moves

	if (moving) {
		movingImage.style.position = 'absolute';
		lastZindex++;
		movingImage.style.zIndex = lastZindex;
		movingImage.style.left = (mouseXCoord - elementXCoord) + "px";
		movingImage.style.top = (mouseYCoord - elementYCoord) + "px";
	}
}

/********************************************************************  
		When the mouseup event is called, this function will reset our 
		variables used to track the moving image.
********************************************************************/

function stopMove() {
	moveObject = null;
	moving = false;
}









