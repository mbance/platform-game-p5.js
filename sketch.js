/*

The Game Project 5 - Making a complete level

Week 7

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds;
var mountains;
var trees;
var houseXs;
var houseY;

var canyon = {x_pos: 300, width: 100};
var coin = {x_pos: 500, y_pos:100, size: 50, isFound:false};

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;

	// Initialise arrays of scenery objects.
	//houseXs
	houseXs = [-750, -300, 1000, 2000];
	
	//clouds
    clouds =  [{x_pos:0,y_pos:100}, {x_pos:400, y_pos:150},{x_pos:800, y_pos:100}, {x_pos:1200, y_pos:150},{x_pos:1600, y_pos:100}, {x_pos: 2000, y_pos: 150}, {x_pos: 2400, y_pos: 100}, {x_pos: 2800, y_pos: 100}]
	
	//mountains
    mountains = [{x_pos: -750, height: 65}, {x_pos: -45, height: 65}, {x_pos: 1050, height: 65}, {x_pos: 2000, height: 65}];	
	
	//trees
	trees = [{x_pos: -500, y_pos: 335}, {x_pos: 400, y_pos: 335}, {x_pos: -900, y_pos: 335}, {x_pos: 2500, y_pos: 335}, {x_pos: -260, y_pos: 335}, {x_pos: 1500, y_pos: 335}, {x_pos: 2050, y_pos: 335}];
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
	

	// Draw clouds.
	push();
   	translate(scrollPos * 0.3, 0);
	drawClouds();
	pop();

	// Draw mountains.
	push();
   	translate(scrollPos * 0.5, 0);
	drawMountains()
    pop();	
	
	// Draw trees.
	push();
   	translate(scrollPos * 1.1, 0);
	drawTrees()
	pop();

	// Draw houses.
	push();
	translate(scrollPos * 1.2, 0);
	drawHouses()
	pop();

	// Draw canyons.
	
	checkCanyon(canyon);
	
	push();
	translate(scrollPos * 1.2, 0);
	drawCanyon(canyon);
	pop();

	// Draw pickup items.
	checkCoin(coin);
	
	push();
	translate(scrollPos * 1.2, 0);
	drawCoin(coin);
	pop();
		
	// Draw game character.
	drawGameChar();
	
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(gameChar_x > width * 0.2)
			{
					gameChar_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(gameChar_x < width * 0.8)
			{
					gameChar_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if(gameChar_y < floorPos_y)
	{
			gameChar_y += 2;
			isJumping = true;
	}
	else
	{
			isJumping = false;
	}

	if(isFalling)
	{
			gameChar_y += 5;
	}

	// Update real position of gameChar for collision detection.
	realPos = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

		// console.log(keyCode);
		// console.log(key);

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					gameChar_y -= 100;
			}
	}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    if(isLeft && isJumping)
    {
        // add your jumping-left code
        //head
        stroke(1);
        fill(255,0,255);
        rect(gameChar_x,gameChar_y-72,15,15);
        rect(gameChar_x+5,gameChar_y-57,3,7);

        //body
        fill(128,0,128);
        rect(gameChar_x+2,gameChar_y-50,10,20);

        //arms
        fill(0,0,255);
        rect(gameChar_x-10,gameChar_y-50,15,5);

        //legs
        fill(0);
        rect(gameChar_x+3,gameChar_y-5,10,5);
        fill(0,255,0);
        rect(gameChar_x+7,gameChar_y-30,5,25);
        rect(gameChar_x-3,gameChar_y-30,15,5);
        rect(gameChar_x-5,gameChar_y-30,5,15);
        fill(0);
        rect(gameChar_x-10,gameChar_y-20,10,5);
        

    }
    else if(isRight && isJumping)
    {
        // add your jumping-right code
        //head
        stroke(1);
        fill(255,0,255);
        rect(gameChar_x,gameChar_y-72,15,15);
        rect(gameChar_x+5,gameChar_y-57,3,7);

        //body
        fill(128,0,128);
        rect(gameChar_x+2,gameChar_y-50,10,20);

        //arms
        fill(0,0,255);
        rect(gameChar_x+10,gameChar_y-50,15,5);

        //legs
        fill(0);
        rect(gameChar_x+2,gameChar_y-5,10,5);
        fill(0,255,0);
        rect(gameChar_x+2,gameChar_y-28,5,23);//Left leg
        rect(gameChar_x+14,gameChar_y-30,5,10); //Lower-leg
        rect(gameChar_x+2,gameChar_y-30,17,5); //Upper-thigh
        fill(0);
        rect(gameChar_x+14,gameChar_y-20,10,5);//Foot
    }
    else if(isLeft)
    {
        // add your walking left code
        //head
        stroke(1);
        fill(255,0,255);
        rect(gameChar_x,gameChar_y-72,15,15);
        rect(gameChar_x+5,gameChar_y-57,3,7);

        //body
        fill(128,0,128);
        rect(gameChar_x+2,gameChar_y-50,10,20);

        //arms
        fill(0,0,255);
        rect(gameChar_x,gameChar_y-50,5,20);
        rect(gameChar_x,gameChar_y-30,5,5);

        //legs
        fill(0);
        rect(gameChar_x+2,gameChar_y-5,10,5);
        fill(0,255,0)
        rect(gameChar_x+7,gameChar_y-30,5,25);
    }
    else if(isRight)
    {
        // add your walking right code
        //head
        stroke(1);
        fill(255,0,255);
        rect(gameChar_x,gameChar_y-72,15,15);
        rect(gameChar_x+5,gameChar_y-57,3,7);

        //body
        fill(128,0,128);
        rect(gameChar_x+2,gameChar_y-50,10,20);

        //arms
        fill(0,0,255);
        rect(gameChar_x+10,gameChar_y-50,5,20);
        rect(gameChar_x+10,gameChar_y-30,5,5);

        //legs
        fill(0);
        rect(gameChar_x+2,gameChar_y-5,10,5);
        fill(0,255,0)
        rect(gameChar_x+2,gameChar_y-30,5,25);
    }
    else if(isJumping || isFalling)
    {
        // add your jumping facing forwards code
        //head
        stroke(1);
        fill(255,0,255);
        rect(gameChar_x+10,gameChar_y-80,7,2);
        rect(gameChar_x+3,gameChar_y-80,15,15);
        rect(gameChar_x+7,gameChar_y-65,7,5);

        //face
        fill(255,0,0);
        rect(gameChar_x+7,gameChar_y-78,3,3);
        rect(gameChar_x+12,gameChar_y-78,3,3);
		fill(0);
        ellipse(gameChar_x+11,gameChar_y-70,5,5);

        //body
        stroke(1);
        fill(128,0,128);
        rect(gameChar_x,gameChar_y-60,20,30);
        ellipse(gameChar_x+10,gameChar_y-50,10,10);

        //arms
        fill(0,0,255);
        rect(gameChar_x+20,gameChar_y-70,5,20);
        rect(gameChar_x-5,gameChar_y-70,5,20);

        //legs
        fill(0,255,0)
        rect(gameChar_x+2,gameChar_y-30,5,13); //left leg
        fill(0);
        rect(gameChar_x+2,gameChar_y-18,5,5); //foot
        fill(0,255,0);
        rect(gameChar_x+12,gameChar_y-30,5,13); //right leg
        fill(0);
        rect(gameChar_x+12,gameChar_y-18,5,5); //foot
    }
    else
    {
        // add your standing front facing code
        //head
        stroke(1);
        fill(255,0,255);
        rect(gameChar_x+10,gameChar_y-75,7,2);
        rect(gameChar_x+3,gameChar_y-75,15,15);
        rect(gameChar_x+7,gameChar_y-60,7,5);
		
        //face
        fill(255,0,0);
        rect(gameChar_x+7,gameChar_y-73,3,3);
        rect(gameChar_x+12,gameChar_y-73,3,3);
        line(gameChar_x,gameChar_y,gameChar_x,gameChar_y);

        //body
        stroke(1);
        fill(128,0,128);
        rect(gameChar_x,gameChar_y-55,20,30);
        ellipse(gameChar_x+10,gameChar_y-45,10,10);

        //arms
        fill(0,0,255);
        rect(gameChar_x+20,gameChar_y-55,5,20);
        rect(gameChar_x-5,gameChar_y-55,5,20);

        //legs
        fill(0);
        rect(gameChar_x+2,gameChar_y-5,5,5);
        fill(0,255,0)
        rect(gameChar_x+2,gameChar_y-25,5,20);
        fill(0);
        rect(gameChar_x+12,gameChar_y-5,5,5);
        fill(0,255,0)
        rect(gameChar_x+12,gameChar_y-25,5,20);
    }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds(){
   	for(var i = 0; i < clouds.length; i++)
       {     
		noStroke();
		fill(255);
		ellipse(clouds[i].x_pos,		clouds[i].y_pos,100,100);
		ellipse(clouds[i].x_pos	+ 50,	clouds[i].y_pos,100,100);
		ellipse(clouds[i].x_pos + 110,	clouds[i].y_pos,100,100);
		ellipse(clouds[i].x_pos	+ 50,	clouds[i].y_pos-30,100,100);
    	}
	}

// Function to draw mountains objects.
function drawMountains(){
	   	for(var i = 0; i < mountains.length; i++)
    	{     
		noStroke();
		fill(128,128,128);
		triangle(mountains[i].x_pos, mountains[i].height, mountains[i].x_pos-200, mountains[i].height+369, mountains[i].x_pos+200, mountains[i].height+369);
		fill(255);
		triangle(mountains[i].x_pos,mountains[i].height,mountains[i].x_pos-35,mountains[i].height+65,mountains[i].x_pos+35,mountains[i].height+65);
		fill(96,96,96);
		triangle(mountains[i].x_pos+80,mountains[i].height+65,mountains[i].x_pos-120,mountains[i].height+369,mountains[i].x_pos+280,mountains[i].height+369);
		fill(255);
		triangle(mountains[i].x_pos+80,mountains[i].height+50,mountains[i].x_pos+45,mountains[i].height+115,mountains[i].x_pos+115,mountains[i].height+115); 
    	}
}

// Function to draw trees objects.
function drawTrees()
{
	for(var i = 0; i < trees.length; i++)
    	{ 
	fill(102,51,0);
    triangle(trees [i].x_pos,trees [i].y_pos,trees [i].x_pos-15,trees [i].y_pos+100,trees [i].x_pos+15,trees [i].y_pos+100);
    fill(0,155,0);
    ellipse(trees [i].x_pos,trees [i].y_pos,50,50);
    ellipse(trees [i].x_pos,trees [i].y_pos+10,50,50);
    ellipse(trees [i].x_pos,trees [i].y_pos-10,50,50);
    ellipse(trees [i].x_pos + 10,trees [i].y_pos,50,50);
    ellipse(trees [i].x_pos - 10,trees [i].y_pos,50,50);
    ellipse(trees [i].x_pos,trees [i].y_pos,50,50);
    stroke(140,95,50);
    ellipse(trees [i].x_pos + 10,trees [i].y_pos,20,10);
    ellipse(trees [i].x_pos + 8,trees [i].y_pos-2,20,10);
    ellipse(trees [i].x_pos + 12,trees [i].y_pos+2,10,5);
    ellipse(trees [i].x_pos + 6,trees [i].y_pos+4,10,5);
    ellipse(trees [i].x_pos + 8,trees [i].y_pos-4,10,5);
    fill(0,155,0);
    noStroke();
	fill(102,51,0);
    triangle(trees [i].x_pos + 150,trees [i].y_pos+40,trees [i].x_pos+125,trees [i].y_pos+100,trees [i].x_pos+175,trees [i].y_pos+100);
	fill(0,155,0);
    triangle(trees [i].x_pos + 150,trees [i].y_pos-50,trees [i].x_pos+100,trees [i].y_pos,trees [i].x_pos+200,trees [i].y_pos);
    triangle(trees [i].x_pos + 150,trees [i].y_pos-25,trees [i].x_pos+100,trees [i].y_pos+50,trees [i].x_pos+200,trees [i].y_pos+50);
	  	}
}

// Function to draw houses objects.
function drawHouse()
{
	for(var i = 0; i < houseXs.length; i++)
	{
	fill(255);
	rect(houseXs[i],houseY+60,125,125);
	rect(houseXs[i]-70,houseY+115,75,70);
		
	fill(255,255,255,75);
	rect(houseXs[i]-70,houseY+50,75,70);
		
	fill(128);
	rect(houseXs[i]-65,houseY+135,60,50);
		
	fill(128,128,128);
	triangle(houseXs[i]+35,houseY-25,houseXs[i]-90,houseY+60,houseXs[i]+150,houseY+60);
		
	fill(0);
	rect(houseXs[i]+50,houseY+145,20,40);
		
	fill(255);
	ellipse(houseXs[i]+65,houseY+170,5,5);
		
	fill(96,96,96);
	rect(houseXs[i]+10,houseY+145,30,30);
	rect(houseXs[i]+80,houseY+145,30,30);
	rect(houseXs[i]+10,houseY+90,30,30);
	rect(houseXs[i]+80,houseY+90,30,30); 
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(canyon)
{
    fill(50,50,0);
    rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
}

// Function to check character is over a canyon.
function checkCanyon(canyon)
{
	if(realPos > canyon.x_pos && realPos < canyon.x_pos + canyon.width)
		{
			if(gameChar_y >= floorPos_y)
				{
					console.log("falling");
					isFalling = true;
				}
		}
}


// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function drawCoin(coin)
	{
		if(!coin.isFound)
			{
				fill(255,0,0);
				ellipse(coin.x_pos + 500, coin.y_pos + 300, 50, 50);
			}
	}

// Function to check character has picked up an item.
function checkCoin(coin)
	{
		if(realPos - 490 < coin.x_pos + coin.size && realPos - 490 > coin.x_pos - coin.size)
			{
				if(gameChar_y >= floorPos_y)
					{
						console.log("found");
						coin.isFound = true;
					}
			}
	}
