var sketchProc = function(processingInstance) {
  with (processingInstance) {
      size(600, 600); 
      frameRate(60);

      var BB8 = function() {
          this.x = 295;
          this.y = 443;
          this.colorThemes = {
              orange: {
                  main: color(205, 118, 64),
                  lightGray: color(175, 170, 165),
                  darkGray: color(144, 147, 150),
                  white: color(245)
              },
              red: {
                  main: color(135, 183, 255),
                  lightGray: color(175, 170, 165),
                  darkGray: color(144, 147, 150),
                  white: color(245)
              },
              black: {
                  main: color(52, 54, 52),
                  lightGray: color(175, 170, 165),
                  darkGray: color(144, 147, 150),
                  white: color(77, 76, 76)
              }
            
          };
          this.colors = this.colorThemes.orange;
          this.head = {
              min: 0,
              max: 50,
              x: 0
          };
          this.speed = 0;
          this.diameter = 205;
          this.radius = this.diameter / 2;
          this.circumference = 2 * PI * this.radius;
          this.angle = 0;
      
          this.draw = function() {
              //BODY
              pushMatrix();
                  //shadow under body
                  noStroke();
                  fill(0, 30);
                  ellipse(295, 443 + this.diameter / 2, this.diameter * 0.9, this.diameter * 0.15);
                  
                  translate(this.x, this.y);
                  rotate(radians(this.angle));
                  translate(-this.x, -this.y);
      
                  //main body
                  noStroke();
                  fill(this.colors.white);
                  ellipse(295, 443, this.diameter, this.diameter);
                  
                  //curved rects on body
                  strokeWeight(1);
                  stroke(209, 209, 209);
                  fill(237, 237, 237);
                  beginShape();
                      vertex(254, 497);
                      bezierVertex(259, 493, 262, 491, 268, 490);
                      bezierVertex(273, 497, 278, 504, 280, 507);
                      bezierVertex(281, 511, 276, 515, 266, 516);
                  endShape(CLOSE);
                  beginShape();
                      vertex(352, 401);
                      bezierVertex(357, 401, 362, 403, 366, 405);
                      bezierVertex(367, 412, 366, 422, 362, 429);
                      bezierVertex(361, 429, 356, 426, 348, 422);
                  endShape(CLOSE);
                  
                  //full circle on body
                  noStroke();
                  fill(this.colors.main);
                  ellipse(294, 403, 123, 103);
                  fill(this.colors.white);
                  ellipse(294, 400, 93, 76);
                  
                  //almost triangles
                  fill(this.colors.main);
                  //bottom
                  beginShape();
                      vertex(283, 439);
                      vertex(287, 420);
                      vertex(296, 420);
                      vertex(300, 439);
                  endShape(CLOSE);
                  //left
                  beginShape();
                      vertex(246, 390);
                      vertex(266, 391);
                      vertex(266, 399);
                      vertex(246, 405);
                  endShape(CLOSE);
                  //top
                  beginShape();
                      vertex(289, 361);
                      vertex(292, 370);
                      vertex(299, 370);
                      vertex(303, 361);
                  endShape(CLOSE);
                  //right
                  beginShape();
                      vertex(342, 395);
                      vertex(322, 393);
                      vertex(321, 402);
                      vertex(342, 409);
                  endShape(CLOSE);
                  
                  fill(this.colors.lightGray);
                  //rect under curve on right
                  beginShape();
                      vertex(305, 375);
                      vertex(301, 378);
                      vertex(314, 389);
                      vertex(318, 386);
                  endShape(CLOSE);
                  //curved on right
                  beginShape();
                      vertex(304, 367);
                      vertex(301, 373);
                      vertex(320, 390);
                      vertex(333, 391);
                      bezierVertex(330, 381, 319, 370, 305, 367);
                  endShape(CLOSE);
      
                  //rect under curve on left
                  beginShape();
                      vertex(268, 404);
                      vertex(273, 400);
                      vertex(285, 411);
                      vertex(281, 417);
                  endShape(CLOSE);
                  //curve on left
                  beginShape();
                      vertex(253, 407);
                      vertex(267, 401);
                      vertex(285, 418);
                      vertex(282, 431);
                      bezierVertex(270, 428, 259, 420, 253, 407);
                  endShape(CLOSE);
                  
                  //lines in middle
                  noStroke();
                  fill(this.colors.lightGray);
                  beginShape();
                      vertex(272, 392);
                      vertex(294, 378);
                      vertex(317, 399);
                      vertex(296, 413);
                  endShape(CLOSE);
                  strokeWeight(1);
                  stroke(this.colors.white);
                  line(284, 379, 312, 405);
                  line(271, 379, 305, 410);
                  
                  //lines on circle
                  stroke(80);
                  strokeWeight(1);
                  line(325, 432, 330, 440);
                  line(321, 435, 326, 443);
                  line(317, 437, 321, 445);
                  
                  //second circle (bottom left)
                  noStroke();
                  fill(this.colors.main);
                  beginShape();
                      vertex(193, 457);
                      bezierVertex(194, 448, 198, 445, 204, 446);
                      bezierVertex(213, 449, 221, 454, 231, 464);
                      bezierVertex(246, 480, 254, 491, 260, 501);
                      bezierVertex(266, 511, 270, 521, 269, 529);
                      bezierVertex(269, 532, 267, 537, 254, 536);
                      bezierVertex(242, 532, 228, 521, 217, 508);
                      bezierVertex(205, 493, 196, 475, 193, 457);
                  endShape(CLOSE);
                  fill(this.colors.white);
                  beginShape();
                      vertex(197, 471);
                      bezierVertex(197, 462, 200, 460, 206, 462);
                      bezierVertex(217, 469, 228, 480, 234, 488);
                      bezierVertex(243, 500, 248, 509, 252, 519);
                      bezierVertex(254, 525, 254, 530, 246, 531);
                      bezierVertex(235, 527, 223, 517, 213, 504);
                      bezierVertex(203, 492, 199, 478, 197, 471);
                  endShape(CLOSE);
                  
                  //details in second circle
                  fill(this.colors.main);
                  beginShape();
                      vertex(202, 460);
                      vertex(206, 478);
                      vertex(209, 478);
                      vertex(209, 461);
                  endShape(CLOSE);
                  beginShape();
                      vertex(245, 496);
                      vertex(232, 501);
                      vertex(236, 507);
                      vertex(252, 509);
                  endShape(CLOSE);
                  
                  fill(this.colors.lightGray);
                  beginShape();
                      vertex(211, 468);
                      vertex(223, 479);
                      vertex(220, 486);
                      vertex(211, 477);
                  endShape(CLOSE);
                  fill(this.colors.darkGray);
                  beginShape();
                      vertex(239, 510);
                      vertex(246, 511);
                      bezierVertex(249, 518, 251, 525, 247, 528);
                      vertex(241, 525);
                      bezierVertex(242, 521, 243, 519, 239, 510);
                  endShape(CLOSE);
                  //circle in circle
                  beginShape();
                      vertex(207, 495);
                      bezierVertex(205, 488, 204, 485, 208, 482);
                      bezierVertex(214, 483, 220, 490, 225, 497);
                      bezierVertex(230, 503, 232, 509, 233, 513);
                      bezierVertex(232, 516, 231, 520, 226, 518);
                      bezierVertex(221, 514, 210, 502, 207, 495);
                  endShape(CLOSE);
      
                  //third circle
                  fill(this.colors.main);
                  beginShape();
                      vertex(393, 470);
                      bezierVertex(391, 456, 380, 455, 371, 458);
                      bezierVertex(358, 462, 338, 477, 322, 497);
                      bezierVertex(311, 514, 304, 525, 308, 534);
                      bezierVertex(311, 540, 321, 542, 329, 540);
                      bezierVertex(360, 528, 387, 501, 393, 470);
                  endShape(CLOSE);
                  fill(this.colors.white);
                  beginShape();
                      vertex(385, 489);
                      bezierVertex(386, 482, 387, 477, 383, 472);
                      bezierVertex(373, 470, 360, 477, 351, 485);
                      bezierVertex(339, 496, 330, 507, 325, 518);
                      bezierVertex(322, 527, 325, 535, 337, 535);
                      bezierVertex(359, 526, 375, 510, 385, 489);
                  endShape(CLOSE);
                  
                  //details in third circle
                  fill(this.colors.main);
                  beginShape();
                      vertex(362, 474);
                      vertex(363, 490);
                      vertex(357, 495);
                      vertex(349, 484);
                  endShape(CLOSE);
      
                  beginShape();
                      vertex(318, 525);
                      vertex(337, 521);
                      vertex(338, 524);
                      vertex(319, 535);
                  endShape(CLOSE);
                  
                  //gray details in circle
                  fill(this.colors.darkGray);
                  beginShape();
                      vertex(337, 518);
                      vertex(328, 520);
                      bezierVertex(335, 504, 345, 494, 350, 490);
                      vertex(354, 496);
                      bezierVertex(346, 505, 341, 510, 337, 518);
                  endShape(CLOSE);
                  beginShape();
                      vertex(377, 502);
                      bezierVertex(378, 495, 375, 492, 370, 493);
                      bezierVertex(360, 496, 352, 502, 348, 509);
                      bezierVertex(343, 515, 342, 519, 346, 523);
                      bezierVertex(351, 526, 355, 526, 362, 519);
                      bezierVertex(367, 515, 374, 509, 377, 502);
                  endShape(CLOSE);
                  //stripes across the dark circle
                  noFill();
                  stroke(this.colors.white);
                  bezier(378, 488, 365, 502, 354, 510, 341, 516);
                  bezier(377, 494, 364, 508, 352, 516, 341, 521);
                  bezier(378, 498, 365, 512, 352, 521, 342, 525);
      
                  //curved lines on body connecting the circles
                  noFill();
                  strokeWeight(1);
                  stroke(this.colors.main);
                  bezier(334, 436, 342, 450, 347, 460, 351, 471);
                  bezier(251, 434, 242, 445, 235, 455, 230, 465);
                  bezier(255, 365, 249, 363, 240, 361, 234, 361);
                  bezier(335, 368, 344, 365, 351, 364, 359, 363);
                  bezier(269, 529, 279, 533, 292, 534, 308, 532);
                  
                  //circles at ends of semi-rects
                  fill(this.colors.main);
                  strokeWeight(1);
                  stroke(40, 50);
                  //main circle
                  ellipse(261, 395, 5, 5);
                  ellipse(296, 366, 5, 5);
                  ellipse(326, 398, 5, 5);
                  ellipse(291.5, 425, 5, 5);
                  //second circle (left)
                  ellipse(206, 474, 2, 3);
                  ellipse(237, 503, 4, 4);
                  //third circle (right)
                  ellipse(358, 488, 5, 5);
                  ellipse(334, 524, 1, 2);
                  
                  //dots on body
                  strokeWeight(1);
                  stroke(209, 209, 209);
                  fill(237, 237, 237);
                  ellipse(222, 431, 8, 8);
                  ellipse(261, 469, 8, 8);
                  ellipse(290, 515, 8, 8);
                  ellipse(320, 473, 8, 8);
                  ellipse(362, 441, 8, 8);
                  ellipse(364, 388, 8, 8);
                  ellipse(222, 384, 8, 8);
              popMatrix();
              
              //HEAD
              pushMatrix();
                  translate(this.x, this.y);
                  rotate((radians(this.speed % 360)));
                  translate(-this.x, -this.y);
                  
                  //antenna
                  pushMatrix();
                      translate(-this.head.x * 0.5, 0);
                      stroke(this.colors.white);
                      strokeWeight(2);
                      line(312, 275, 312, 241);
                      stroke(0);
                      line(312, 244, 312, 241);
                      stroke(this.colors.white);
                      strokeWeight(1);
                      line(306, 271, 305, 259);
                  popMatrix();
                  
                  //top part of head
                  noStroke();
                  fill(this.colors.white);
                  arc(295, 335, 132, 135, radians(185), radians(357));
                  
                  //lines across top of head
                  noStroke();
                  fill(144, 172, 197);
                  beginShape();
                      vertex(269, 273);
                      vertex(319, 273);
                      bezierVertex(323, 273, 327, 275, 335, 281);
                      vertex(254, 282);
                      bezierVertex(257, 280, 260, 277, 269, 273);
                  endShape(CLOSE);
                  
                  noStroke();
                  fill(this.colors.main);
                  quad(247, 288, 341, 287, 345, 291, 244, 291);
                  
                  pushMatrix();
                      translate(this.head.x, 0);
                      //eyes
                      //large
                      fill(211);
                      ellipse(263, 303, 39, 39);
                      fill(0);
                      ellipse(263, 303, 30, 30);
                      fill(245);
                      ellipse(270, 295, 4, 4);
                      //small
                      fill(211);
                      stroke(0);
                      ellipse(291, 316, 19, 19);
                      noStroke();
                      fill(0);
                      ellipse(291, 316, 12, 12);
                      //red dot
                      fill(207, 72, 72);
                      ellipse(263, 308, 6, 6);
                  popMatrix();
                  
                  //shadow under head (on top of body)
                  fill(0, 80);
                  arc(this.x, 354, 101, 17, radians(181), radians(360));
                  
                  //bottom of head
                  fill(this.colors.white);
                  beginShape();
                      vertex(229, 330);
                      bezierVertex(228, 341, 237, 347, 246, 348);
                      vertex(343, 348);
                      bezierVertex(353, 346, 362, 340, 361, 330);
                  endShape(CLOSE);
                  
                  //rects at bottom of head
                  pushMatrix();
                      translate(this.head.x, 0);
                      fill(this.colors.main);
                      rect(231, 332, 8, 8);
                      rect(241, 332, 8, 8);
                      rect(255, 330, 25, 10);
                      rect(290, 330, 5, 10);
                      rect(300, 330, 5, 10);
                  popMatrix();
                  
                  //gray stripe at bottom of head
                  fill(215);
                  beginShape();
                      vertex(231, 339);
                      vertex(359, 339);
                      bezierVertex(358, 340, 357, 341, 355, 343);
                      vertex(235, 343);
                      bezierVertex(233, 342, 232, 341, 231, 339);
                  endShape(CLOSE);
              popMatrix();
          };
          this.move = function() {
              //set the speed based on the position of the mouse
              if(mouseX < this.x - 5 || mouseX > this.x + 5) {
                  this.speed = map(mouseX, 0, width, -15, 15);
              }
              else {
                  this.speed = round(lerp(this.speed, 0, 0.1));
              }
              
              //used to rotate the body and head
              this.angle+= this.speed / this.circumference * 360;
              
              //used to swivel the head from side to side
              this.head.x = lerp(this.head.x, this.speed < 0 ? this.head.min : this.head.max, 0.05);
          };
          this.go = function() {
              this.draw();
              this.move();
          };
      };
      
      var Scene = function() {
          this.page = "load";
          this.images = undefined;
          this.imageIndex = 0;
          this.loaded = false;
          this.showClick = true;
          this.theme = 0;
          this.themeColors = {
              orange: {
                  hill: color(1, 4, 10)
              },
              red: {
                  hill: color(1, 4, 10)
              },
              black: {
                  hill: color(1, 4, 10)
              }
          };
          this.hillColor = this.themeColors.orange.hill;
          this.bb8 = new BB8();
          this.triangles = [];
          this.spots = [];
          this.stars = [];
          this.dusts = [];
          this.planets = [];
      
          this.init = function() {
              
          };
          this.init();
          this.setup = function() {
              this.images = {
                  skyBlue: function() {
                      background(0, 0);
      
                      noStroke();
                      for(var i = 0; i <= 400; i++) { 
                          fill(lerpColor(color(1, 4, 10), color(1, 4, 10), i/400));
                          rect(0, i, width, 1);
                      }
                      
                      return get(0, 0, width, 400);
                  },
                  skyRed: function() {
                      background(0, 0);
      
                      noStroke();
                      for(var i = 0; i <= 400; i++) { 
                          // fill(lerpColor(color(217, 66, 52), color(214, 153, 148), i/400));
                          fill(lerpColor(color(1, 4, 10), color(1, 4, 10), i/400));
                          rect(0, i, width, 1);
                      }
                      
                      return get(0, 0, width, 400);
                  },
                  skyBlack: function() {
                      background(0, 0);
      
                      noStroke();
                      for(var i = 0; i <= 400; i++) { 
                          fill(lerpColor(color(1, 4, 10), color(1, 4, 10), i/400));
                          rect(0, i, width, 1);
                      }
                      
                      return get(0, 0, width, 400);
                  },
                  ground: function() {
                      background(0, 0);
      
                      noStroke();
                      for(var i = 0; i <= 200; i++) { 
                          fill(lerpColor(color(1, 4, 10), color(1, 4, 10), i/200));
                          rect(0, i, width, 1);
                      }
                      
                      return get(0, 0, width, 200);
                  }
              };
          };
          this.setup();
          this.load = function (s) {
              var obj = Object.keys(this.images);
              this.images[obj[this.imageIndex]] = this.images[obj[this.imageIndex]]();
              this.imageIndex++;
              
              background(118, 191, 234);
              pushStyle();
                  fill(240, 200);
                  textAlign(CENTER, CENTER);
                  textSize(40);
                  text('LOADING', 300, 300);
                  noFill();
                  stroke(240, 200);
                  strokeWeight(10);
                  arc(300, 300, 300, 300, 0, map(this.imageIndex / obj.length, 0, 1, radians(0), radians(360)));
                  strokeWeight(1);
              popStyle();
          
              if(this.imageIndex < obj.length){
                  this.loaded = false;
              }
              else {
                  this.loaded = true;
                  this.skyImage = this.images.skyBlue;
                  this.page = s;
              }
          };
          this.setTheme = function() {
              //set theme to either 0, 1, or 2
              this.theme = (this.theme + 1) % 3;
          
              //select the appropriate color theme
              switch(this.theme) {
                  case 0:
                      this.skyImage = this.images.skyBlue;
                      this.hillColor = this.themeColors.orange.hill;
                      this.bb8.colors = this.bb8.colorThemes.orange;
                      break;
                  case 1:
                      this.skyImage = this.images.skyRed;
                      this.hillColor = this.themeColors.red.hill;
                      this.bb8.colors = this.bb8.colorThemes.red;
                      break;
                  case 2:
                      this.skyImage = this.images.skyBlack;
                      this.hillColor = this.themeColors.black.hill;
                      this.bb8.colors = this.bb8.colorThemes.black;
                      break;
              }
              
              //hides the "click the screen" text the first time you click
              this.showClick = false;
          };
          this.runSpots = function() {
              noStroke();
              
              //move and draw each of the spots on the ground
              for(var i = 0; i < this.spots.length; i++) {
                  var spot = this.spots[i];
                  
                  if(this.bb8.speed > 0 && spot.x + spot.w < 0) {
                      spot.x = random(width + 100, width + 200);
                      spot.y = random(420, 600);
                      spot.w = map(spot.y, 420, 600, 20, 100);
                      spot.h = spot.w * 0.2;
                      spot.opacity = 150 - spot.w;
                  }
                  else if(this.bb8.speed < 0 && spot.x > width) {
                      spot.x = random(-200, -100);
                      spot.y = random(420, 600);
                      spot.w = map(spot.y, 420, 600, 20, 100);
                      spot.h = spot.w * 0.2;
                      spot.opacity = 150 - spot.w;
                  }
                  else {
                      spot.x-= this.bb8.speed;
                  }
                  
                  //draw the spot
                  fill(212, 191, 148, spot.opacity);
                  ellipse(spot.x, spot.y, spot.w, spot.h);
              }
          };
          this.runStars = function() {
              noStroke();
              
              //draw and move each of the stars
              for(var i = 0; i < this.stars.length; i++) {
                  var star = this.stars[i];
                  
                  if(this.bb8.speed > 0 && star.x + star.radius < 0) {
                      star.x = random(width + 10, width + 20);
                      star.y = random(300);
                      star.radius = random(1, 3);
                      star.opacity = random(50, 150);
                  }
                  else if(this.bb8.speed < 0 && star.x > width) {
                      star.x = random(-20, -10);
                      star.y = random(300);
                      star.radius = random(1, 3);
                      star.opacity = random(50, 150);
                  }
                  else {
                      star.x-= this.bb8.speed * 0.02;
                  }
                  
                  //draw the star
                  fill(250, star.opacity);
                  ellipse(star.x, star.y, star.radius, star.radius);
              }
          };
          this.runMountains = function() {
              //mountains (triangles)
              fill(this.hillColor);
              noStroke();
              //loop through each of the triangles in the triangles array
              for(var i = 0; i < this.triangles.length; i++) {
                  //move each triangle at the same speed as bb-8
                  this.triangles[i].x-= this.bb8.speed * 0.2;
                  
                  //draw the triangles
                  triangle(   this.triangles[i].x, 
                              this.triangles[i].y, 
                              this.triangles[i].x + this.triangles[i].w, 
                              this.triangles[i].y, 
                              this.triangles[i].x + this.triangles[i].w / 2, 
                              this.triangles[i].y - this.triangles[i].h);
                  
                  //if a triangle goes off the screen then reset it
                  //back to the width of the screen with a new random height
                  if(this.bb8.speed > 0 && this.triangles[i].x + this.triangles[i].w <= 0) {
                      this.triangles[i].x = width;
                      this.triangles[i].h = ~~random(50, 100);
                  }
                  else if(this.bb8.speed < 0 && this.triangles[i].x >= width) {
                      this.triangles[i].x = -this.triangles[i].w;
                      this.triangles[i].h = ~~random(50, 100);
                  }
              }
          };
          this.runPlanets = function() {
              //colors for planets
              noStroke();
              fill(200, 30);
              
              //move and draw each of the planets
              for(var i = 0; i < this.planets.length; i++) {
                  var planet = this.planets[i];
                  
                  if(this.bb8.speed > 0 && planet.x < -600) {
                      planet.x = 600 + planet.size;
                  }
                  else if(this.bb8.speed < 0 && planet.x - planet.size > 600) {
                      planet.x = -600;
                  }
                  else {
                      planet.x-= this.bb8.speed * 0.015;
                  }
                  
                  //draw the planet
                  ellipse(planet.x, planet.y, planet.size, planet.size);
              }
          };
          this.runDust = function() {
              //randomly add dust when moving at a certain speed
              if(this.bb8.speed < -10 || this.bb8.speed > 10) {
                  this.dusts.push({
                      x: 295,
                      y: 443 + this.bb8.diameter * 0.48,
                      vx: random(this.bb8.speed * 0.4, this.bb8.speed * 0.5),
                      vy: random(-4, -2),
                      radius: random(2, 5),
                      gravity: 0.1,
                      opacity: 200
                  });
              }
              else {
                  for(var i = 0; i < this.dusts.length; i++) {
                      this.dusts[i].vx = this.bb8.speed;
                  }
              }
              
              for(var i = 0; i < this.dusts.length; i++) {
                  var dust = this.dusts[i];
                  
                  fill(191, 179, 132);
                  ellipse(dust.x, dust.y, dust.radius, dust.radius);
                  
                  dust.x-= dust.vx;
                  dust.y = constrain(dust.y + dust.vy, 0, 443 + this.bb8.diameter / 2);
                  dust.vy+= dust.gravity;
                  dust.opacity-= 3;
              }
              
              //credit to Bob Lyon for a memory free way to "splice" objects
              while (this.dusts.length > 0 && this.dusts[0].opacity <= 0) {
                  this.dusts.shift();
              }
          };
          this.go = function() {
              image(this.skyImage, 0, 0);
              
              this.runPlanets();
              
              this.runStars();
              
              this.runMountains();
              
              image(this.images.ground, 0, 400);
              
              this.runSpots();
              
              this.runDust();
              
              this.bb8.go();
              
              if(this.showClick) {
                  pushStyle();
                      textAlign(CENTER);
                      textSize(20);
                      fill(255, 50);
                      text("Click the screen\nfor a different color", 300, 120);
                  popStyle();
              }
          };
      };
      
      var scene = new Scene();
      
      draw = function() {
          background(79, 78, 79);
      
          switch(scene.page) {
              case "load":
                  scene.load("go");
                  break;
              case "go":
                  scene.go();
                  break;
          }
      };
      
      mouseClicked = function() {
          scene.setTheme();
      };

  }
};

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);