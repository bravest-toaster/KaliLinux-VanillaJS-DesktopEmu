//This is the terminal program REMEMBER**** THE way we have this structured requires explicit declarations of all intended functions
// This is same terminal backend used on Ayesu site, not RXOPharm. so just reading user input and passing to variables won't work!

// *** MICHAEL DECLARE EXPLICIT INTENDED FUNCTIONS IN CASE SENSITIVITY 
// REMEMBER TO DELETE ALL YOU"RE STUPID ASS REMINDER COMMENTS...and take this as a reminded to not try and keep modular integrity in mind for the sake of reusing these scripts and website elemnts for later actual paid projects. 
// Like a whole weekend writing JS...for a class project..........bc you want to modularize it and reuse it................think about this
// STOP.......GET SOME HELP

/* Mike Pinkerman 2019
	Kali Linux Terminal "Emulator" in Browser Window
	pinkermanpublic@gmail.com
	michaelpinkerman.com
*/

$(document).ready(function() {
		"use strict";
		//util
		function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
		}
		//command entries **MUST WRITE OUT AS FUNCTIONS TO BE ACTUAL FUNCTIONS DUMMY
		function clear() {
				terminal.text("");
		}
		function ls() {
				terminal.append(". ..  /secrets  /enlightenment  voodoo.txt  Hello_Friend.txt   Calpurnia.txt\n");
		}
		function cat(args) {
				var str= args.join(" ");
				if (str == "Hello_Friend.txt") {
					terminal.append("Hello There Friend, How are you doing? Glad you could make it\nPlease be sure to seek out that which you were instructed to find\nImposters will never make it beyond the gates\nGo Swiftly Into The Night\nAlways Watching...");

				} else if (str == "Calpurnia.txt") {
					terminal.append("frqjudwxodwlrqv vpduwb sdqwv brx iljxuhg rxw krz wr uhdg wklv whaw mxvw ibl wklv lv rqh elj iuhdnlqj uxq rq vhqwhqfh zlwk vklw sxqfwxdwlrq dqg judppdwlfdo ghflvlrqv wklv lv lq sduw gxh wr wkh qdwxuh ri fdhvdu flskhuv dqg lq sduw gxh wr ph zdqwlqj wr xvh dqg pdnh vxuh pb rzq dojrulwkp zrunv uljkw vrph fdhvdu flskhuv mxvw xvh vlpsoh vwulqj phwkrgv olnh wrorzhufdvh wr pdnh doo wkh whaw lq wkh vdph hadfw fdvh rwkhuv zloo vnls wklv ryhu vr wklqjv vwdqg rxw pruh zhuh jrlqj eb wkh vhfxulwb wkurxjk revfxulwb phwkrgrorjb khuh dqg wkh pruh zh fdq ixuwkhu reixvfdwh wkh ehwwhu exw dovr l zdqw wr pdnh lw vrphzkdw vroydeoh ehfdxvh zkdw ixq lv wkhuh lq pdnlqj d vwxslgob ulglfxorxv fkdoohqjh wkdw qr rqh fdq vroyh? zkb grqw brx orrn zkhuh wklv ilqh odgb'v suhghfhvvru lv? l zrxog wub wr uhdg wkh iloh ri wkhlu qdph mxvw olnh brx glg wklv rqh, gr fdslwdolch khu qdph zrqw brx?\n")
				} else if (str == "Pompeia") {

				}
				else {
					terminal.append("cat: " + str + " NO such file or directory\n ");
				}
			
		}
		function help() {
				terminal.text("NU bash, version 4.4.19(1)-release (x86_64-pc-linux-gnu)\nThese shell commands are defined internally.  Type `help' to see this list.\nType `help name' to find out more about the function `name'.\nUse `info bash' to find out more about the shell in general.\nUse `man -k' or `info' to find out more about commands not in this list.\n\nA STAR (*) NEXT TO A NAME MEANS THAT THE COMMAND IS DISABLED.\nJOB_SPEC [&]                                                                                                                    HISTORY [-C] [-D OFFSET] [N] OR HISTORY -ANRW [FILENAME] OR HISTORY -PS ARG [ARG...]\n(( EXPRESSION ))                                                                                                                IF COMMANDS; \nYOU SHOULD NOT BE HERE IF YOU'RE ASKING FOR HELP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\nYou should know well about famousecho, watchers, etc...I mean the rest of it just listed. You don't know the CLI?");
		}
		function echo(args) {
				var str = args.join(" ");
				terminal.append(str + "\n");
		}
		function famousecho() {
			// Remember event listeners for returning of XHR request, or verbose output will cease
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'https://cdn.rawgit.com/bmc/fortunes/master/fortunes', false);
				xhr.send(null);
				if (xhr.status === 200) {
						var fortunes = xhr.responseText.split("%");
						var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
						terminal.append(fortune + "\n");
				}
		}
		function watchers() {
			terminal.append("/ˈwäCHər/ \nNOUN:\n a person who observes something attentively or regularly.......\nAlso maybe yourself if you proceed correctly\nAre you a part of THEWATCHERS?\n")
		}
		function THEWATCHERS(){
			terminal.append("THE ones who diligently watch over you\nWho reside in the shadows watching, waiting to strike\nThose who defend the defenseless\nThose who stand for those who cannot stand\nThose who work tirelessly to avenge injustices\nThose who use their dark powers for good\n...even if law enforcement say otherwise. Someone has to balance the scales\nThose who watch will do so....\n");
		}
		//End of command literals / function creation
		// Now set them as vars in an array to pass correctly when called upon using literal input
		var title = $(".title");
		var terminal = $(".terminal");
		var prompt = "root@watchSec-aws-mainframe";
		var path = "~ $";
		// Store empty array to hold command history so using arrows will return realistic terminal functionality with history using up arrow
		var commandHistory = [];
		//Store history index start at 0
		var historyIndex = 0;
		// Store empty string for 'command' so it can be re-initialized and re-used via history arrows
		var command = "";
		// REMEMBER your 'made-up' functions need to be literals and case-sensitive in keypairs inside array holding them.
		// Remember keypairs utilize much less memory, return faster, and have overall better performance, despite your desire to do this differently at first glance
		var commands = [{
						"name": "clear",
						"function": clear
				}, {
						"name": "help",
						"function": help
				}, {
						"name": "ls",
						"function": ls
				}, {
						"name": "THEWATCHERS",
						"function": THEWATCHERS
				}, {
						"name": "famousecho",
						"function": famousecho
				},  {
						"name": "cat",
						"function": cat
				},  {
						"name": "watchers",
						"function": watchers
				}, {
						"name": "echo",
						"function": echo
				}];

function processCommand() {
		var isValid = false;

		// Create args list by splitting the command
		// by space characters and then shift off the
		// actual command.

		var args = command.split(" ");
		var cmd = args[0];
		args.shift();

		// Iterate through the available commands to find a match.
		// Then call that command and pass in any arguments.
		for (var i = 0; i < commands.length; i++) {
				if (cmd === commands[i].name) {
						commands[i].function(args);
						isValid = true;
						break;
				}
		}

		// No match was found...
		if (!isValid) {
				terminal.append("zsh: command not found: " + command + "\n");
		}

		// add command to commandhistory array to be called upon later and clear up
		commandHistory.push(command);
		historyIndex = commandHistory.length;
		command = "";
}

function displayPrompt() {
		terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
		terminal.append("<span class=\"path\">" + path + "</span> ");
}
function erase(n) {
		command = command.slice(0, -n);
		terminal.html(terminal.html().slice(0, -n));
}
function clearCommand() {
		if (command.length > 0) {
				erase(command.length);
		}
}
function appendCommand(str) {
		terminal.append(str);
		command += str;
}
//This added to keep scroll @ bottom of page in conjunction with CSS property 'overflow:auto'
// This allows content to extend beyond window context and this JS function sets top to height to keep window scrolled to very bottom with every key press like real term window
function checkScroll() {
		document.getElementById("terms").scrollTop = document.getElementById("terms").scrollHeight;
	
}
/*
	***MICHAEL****
	THIS SECTION IS IMPORTANT SO MULTI_LINE COMMENT_TIME
	**************
	Remember to preventDefault on keycode of backspace keyboard press. This will prevent navigation away from our terminal we create and
	lend even more legitimacy to our fake terminal being indeed a real live shell / terminal instance
	We don't need to catch very many keys, arrows and backspace and no other specials since we're going for verbose input of keystrokes into terminal window elemnt
	remember to apply this same function on copy-lock portion of "defense strategies" you implement for show-and-tell portion of presentation
	DONT REWRITE THE WHEEL HERE
*/
$(document).keydown(function(e) {
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// BACKSPACE
		if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
				e.preventDefault();
				if (command !== "") {
						erase(1);
				}
		}

		// Up arrow and Down arrow keycode catches for input recognition of our history function to make it work properly
		if (keyCode === 38 || keyCode === 40) {
				// Move up or down the history
				if (keyCode === 38) {
						// UP
						historyIndex--;
						if (historyIndex < 0) {
								historyIndex++;
						}
				} else if (keyCode === 40) {
						// DOWN
						historyIndex++;
						if (historyIndex > commandHistory.length - 1) {
								historyIndex--;
						}
				}

				// fetch previous commmand for history
				var cmd = commandHistory[historyIndex];
				if (cmd !== undefined) {
						clearCommand();
						appendCommand(cmd);
				}
		}
});
$(document).keypress(function(e) {
		// Ensure even is the write one
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;
		// keycode switch instance so we can re-use this function for copy-lock re-writes
		switch (keyCode) {
				//13 = ENTER
				case 13:
						{
								checkScroll();
								terminal.append("\n");
								

								processCommand();
								displayPrompt();
								
								break;
						}
				default:
						{
								appendCommand(String.fromCharCode(keyCode));
								checkScroll();
						}
		}
});
//Set window 'title' here and not above in function iteration module
title.text("1. root@watchSec: ~ (zsh)");

// Get date
var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);
// 'last login' added for more legitimacy
terminal.append("Last login: " + date + " on ttys000\n"); displayPrompt();
terminal.append("Welcome to Ubuntu 18.04.1 LTS (GNU/Linux 4.15.0-1021 x86_64)\n"); displayPrompt() ;
});

/* NEXT FAKEY TERMINAL ASPECT

We need to make the window movable, easily done via css with position attr, and a few lines of JS
This comment is just serving as a demarc point whenever I choose to recycle this script into something else
REMEMBER TO COMMIT THIS
*/

dragElement(document.getElementById("mydiv"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
	//Backup / fallback logic incase header property isn't found
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  //Stop drag function when mouse is let up
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}