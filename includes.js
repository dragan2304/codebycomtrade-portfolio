//menu and window
var nav = {
  init: function () {
    nav.menuBtn = document.getElementById("menu-btn");
    nav.menuBtn.addEventListener("click", nav.toggleMenu);

    nav.menu = document.querySelector(".navigation");
    window.addEventListener("resize", nav.onResize);
  },

  onResize: function () {
    if (
      window.innerWidth > 992 &&
      window.getComputedStyle(nav.menu).display === "none"
    ) {
      nav.menuBtn.innerHTML = '<i class="fa fa-times"></i>';
      nav.menu.style.display = "block";
    } else if (
      window.innerWidth < 991 &&
      window.getComputedStyle(nav.menu).display === "block"
    ) {
      nav.menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
      nav.menu.style.display = "none";
    }
  },

  toggleMenu: function () {
    nav.changeBtn();
    if (window.getComputedStyle(nav.menu).display === "block") {
      nav.menu.style.display = "none";
      return;
    }
    nav.menu.style.display = "block";
  },

  changeBtn: function () {
    if (nav.menuBtn.innerHTML == '<i class="fa fa-bars"></i>') {
      nav.menuBtn.innerHTML = '<i class="fa fa-times"></i>';
      return;
    }
    nav.menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
  },
};
document.addEventListener("DOMContentLoaded", nav.init);

///////////////////////////////
//                           //
// Terminal starts from here //
//                           //
///////////////////////////////

//Current line
var CurrentId = undefined;
var hostname = "debian";
var username = "codebycomtrade";
var folder = "~";

//print greetings
$("#Terminal").append(
  '<div id="welcome">👋 Hi, my name is Dragan Đikandić.</div><br/><br/> I&apos;m a virtualization architect, <a href="https://www.linkedin.com/in/stefan-pejcic/" target="_blank">medior DevOps engineer</a>, and  <a href="https://profiles.wordpress.org/stefanpejcic/#content-plugins" target="_blank">WordPress plugin developer.</a><br/><br/>'
);
$("#Terminal").append(
  "Use the following commands to get to know me:<br/><br/>"
);

//help commands
$("#Terminal").append("whoami &nbsp; - &nbsp; About myself<br/>");
$("#Terminal").append("social &nbsp; - &nbsp; My social profiles<br/>");
$("#Terminal").append("resume &nbsp; - &nbsp; Download my resume<br/><br/>");

//Onload
NewLine();

//Enter button
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  if (x === 13 || x == 13) {
    var consoleLine = $("#" + CurrentId + " input").val();
    var delay = ExecuteLine(consoleLine);
    setTimeout(NewLine, delay);
  }
});
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  var line = $("#" + CurrentId + " input");
  var length = line.val().length;
  if (x != 8) {
    line.attr("size", 1 + length);
  } else {
    line.attr("size", length * 0.95);
  }
  if (length === 0) {
    $("#" + CurrentId + " input").attr("size", "1");
  }
});

// focus terminal on mouse click - only for terminal area
$(document).on("click", function (e) {
  // Check if click is within terminal area
  if ($(e.target).closest('.window').length > 0) {
    $("#" + CurrentId + " input").focus();
  }
});

//new line
function NewLine() {
  if (CurrentId !== undefined) {
    $("#" + CurrentId + " input").prop("disabled", true);
  }
  CurrentId = "consoleInput-" + GenerateId();
  if (username !== "") {
    $("#Terminal").append(
      '<div class="console-line" id="' +
        CurrentId +
        '">' +
        username +
        "@" +
        hostname +
        ':<span class="terminal-purple">' +
        folder +
        ' $</span> <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>'
    );
  } else {
    $("#Terminal").append(
      "The programs included with the Debian GNU/Linux system are free software;<br/>"
    );
    $("#Terminal").append(
      "the exact distribution terms for each program are described in the<br/>"
    );
    $("#Terminal").append(
      "individual files in /usr/share/doc/*/copyright.<br/><br/>"
    );
    $("#Terminal").append(
      "Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent<br/>"
    );
    $("#Terminal").append("permitted by applicable law.<br/><br/>");
    $("#Terminal").append(
      '<div id="' +
        CurrentId +
        '">Login as: <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>'
    );
  }
  $("#" + CurrentId + " input").focus();
  $("#" + CurrentId + " input").attr("size", "1");
}

//execute the line
function ExecuteLine(command) {
  $(".console-carrot").remove();
  var CurrentCommand = command.toLowerCase();

  if (username === "") {
    username = CurrentCommand;
    return 500;
  } else {
    //clear
    if (CurrentCommand == "clear") {
      $("#Terminal").empty();
    }
    //logout
    else if (CurrentCommand == "exit" || CurrentCommand == "logout") {
      $("#Terminal").empty();
      username = "";
    }
    //echo
    else if (CurrentCommand.startsWith("echo")) {
      var NewLine = CurrentCommand.replace("echo ", "");
      $("#Terminal").append(NewLine);
    }
    //hostname
    else if (CurrentCommand.startsWith("hostname")) {
      var name = CurrentCommand.replace("hostname ", "");
      if (name !== "") {
        hostname = name;
      }
    }
    //cd
    else if (CurrentCommand.startsWith("cd")) {
      var Address = CurrentCommand.replace("cd ", "")
        .replace(" ", "")
        .replace("//", "");
      if (Address == "/" || Address == "" || Address == "cd") {
        folder = "~";
      } else {
        folder = Address;
      }
    }
    //pwd
    else if (CurrentCommand.startsWith("pwd")) {
      $("#Terminal").append("&#47;var&#47;www&#47;html&#47;").append(folder);
    }
    //ls
    else if (CurrentCommand == "ls") {
      $("#Terminal").append("README.md<br/>");
      $("#Terminal").append("LICENSE<br/>");
      $("#Terminal").append(".gitignore<br/>");
    }
    //ll
    else if (CurrentCommand == "ll" || CurrentCommand == "ls -la") {
      $("#Terminal").append("total 16<br/>");
      $("#Terminal").append(
        "dr-xr-x---.&nbsp;&nbsp; 9 root root&nbsp;&nbsp; 4096&nbsp;&nbsp;dec 30 07&#58;15 .<br/>"
      );
      $("#Terminal").append(
        "dr-xr-xr-x.&nbsp;&nbsp;20 root root&nbsp;&nbsp; 4096&nbsp;&nbsp;nov 15 21&#58;20 ..<br/>"
      );
      $("#Terminal").append(
        "drwx------ &nbsp;&nbsp; 3 root root&nbsp;&nbsp; 4096&nbsp;&nbsp;nov 19 19&#58;53 .gitignore<br/>"
      );
      $("#Terminal").append(
        "-rw-r--r--.&nbsp;&nbsp; 1 root root&nbsp;&nbsp;&nbsp;&nbsp;100&nbsp;&nbsp;dec 29  2013 &nbsp;README.md<br/>"
      );
      $("#Terminal").append(
        "-rw-r--r--.&nbsp;&nbsp; 1 root root&nbsp;&nbsp;&nbsp;&nbsp;100&nbsp;&nbsp;dec 29  2013 &nbsp;LICENSE<br/>"
      );
    }
    //help
    else if (CurrentCommand == "help" || CurrentCommand == "?") {
      $("#Terminal").append(
        "GNU bash, version 4.3.30(1)-release (arm-unknown-linux-gnueabihf)<br/>"
      );
      $("#Terminal").append(
        'These shell commands are defined internally.  Type "help" to see this list.<br/><br/>'
      );
      $("#Terminal").append(
        "A star (*) next to a name means that the command is disabled.<br/>"
      );
      $("#Terminal").append(
        "cd [dir] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Change directory<br/>"
      );
      $("#Terminal").append(
        "clear &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Clear console screen<br/>"
      );
      $("#Terminal").append(
        "date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Display current date and time<br/>"
      );
      $("#Terminal").append(
        "echo [arg...] &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Echo text back in console<br/>"
      );
      $("#Terminal").append(
        "pwd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Prints name of the present/current working directory<br/>"
      );
      $("#Terminal").append(
        "ls &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  List files and directories<br/>"
      );
      $("#Terminal").append(
        "exit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout of terminal<br/>"
      );
      $("#Terminal").append(
        "help &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Get Help about command<br/>"
      );
      $("#Terminal").append(
        "hostname [arg..]&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Change hostname<br/>"
      );
      $("#Terminal").append(
        "logout &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout of terminal<br/>"
      );
    }

    //whoami
    else if (CurrentCommand == "whoami" || CurrentCommand == "who") {
      $("#Terminal").empty();
      $("#Terminal").append(
        '<img src="https://cdn.freebiesupply.com/images/large/2x/linux-logo-png-transparent.png" id="dragan" style="float: left;width: 10%; padding-right: 10px;"/></br>Dragan Đikandić – Linux sistem administrator i osnivač hosting kompanije Stellar Technologies. Radim na razvoju stabilnih, sigurnih i automatizovanih sistema.<br/><br/>Moje primarne oblasti su rad sa DevOps tehnologijama i alatima, razvoj alata unutar myVestaCP panela, i administracija VPS i dedicated servera. Svoj rad temeljim na efikasnosti, sigurnosti i potpunom razumevanju sistema koje održavam.<br/><br/>U slobodno vreme se posvećujem razvoju sopstvenih projekata, učenju JavaScripta i frontend tehnologija.<br/><br/>Kompetencije&#58; Linux administracija, Bash scripting, WordPress multisite, MyVestaCP, DNS, PHP, DevOps alati<br/>'
      );

      $("#Terminal").append(
        "<br/>experience &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Prethodna zaposlenja i projekti<br/>"
      );
      $("#Terminal").append(
        "education &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Obrazovanje i sertifikati<br/>"
      );
    }
    //experience
    else if (CurrentCommand == "experience" || CurrentCommand == "jobs") {
      $("#Terminal").append(
        'Osnivač i administrator u <img src="https://pcx3.com/slike/mega.png" height="16px"> Stellar Technologies<br/><br/>'
      );
      $("#Terminal").append("2022 - trenutno<br/>");
      $("#Terminal").append(
        '<i class="fa fa-map-marker"></i> Srbija (remote global)<br/><br/>'
      );
      $("#Terminal").append(
        "Pružam upravljanje VPS-ovima i hostovanim sistemima zasnovanim na MyVestaCP panelu. Fokusiram se na sigurnost, dostupnost i automatizaciju kako bih klijentima omogućio pouzdan i brz hosting.<br/><br/>"
      );
      $("#Terminal").append("<hr/><br/>");

      $("#Terminal").append(
        "Freelance sistem administrator i DevOps konsultant<br/><br/>"
      );
      $("#Terminal").append("2018 - 2022<br/>");
      $("#Terminal").append(
        '<i class="fa fa-map-marker"></i> Remote<br/><br/>'
      );
      $("#Terminal").append(
        "Radio sam na migracijama, optimizaciji i održavanju sistema baziranih na Linux-u, sa fokusom na Debian ekosistemu i rešavanje kompleksnih problema sa serverima.<br/>"
      );
    }
    //education
    else if (
      CurrentCommand == "education" ||
      CurrentCommand == "certificates"
    ) {
      $("#Terminal").append(
        "Ekonomski fakultet Univerziteta u Beogradu<br/><br/>"
      );

      $("#Terminal").append("<hr/>myVesta & Linux prakse<br/>");
      $("#Terminal").append(
        '<img src="/images/favicon.ico" width="16px"></img> Rad na myVestaCP repou i kreiranje prilagođenih v- komandi<br/>'
      );
      $("#Terminal").append(
        '<img src="/images/favicon.ico" width="16px"></img> Automatizacija kroz Bash i cron skripte za održavanje servera<br/>'
      );

      $("#Terminal").append("<hr/>Frontend Dev kurs (u toku)<br/>");
      $("#Terminal").append(
        '<img src="/images/favicon.ico" width="16px"></img> HTML, CSS, JavaScript, React, Redux<br/>'
      );
      $("#Terminal").append(
        '<img src="/images/favicon.ico" width="16px"></img> Unit testiranje i finalni projekat u izradi<br/>'
      );
    }

    //social
    else if (CurrentCommand == "social" || CurrentCommand == "?") {
      $("#Terminal").append("<br/>");
      $("#Terminal").append(
        '<i class="fa fa-linkedin"></i>: <a href="https://www.linkedin.com/" target="_blank">https://www.linkedin.com</a><br/><br/>'
      );
      $("#Terminal").append(
        '<i class="fa fa-github"></i>: <a href="https://github.com/isscbta" target="_blank">https://github.com/isscbta</a><br/><br/>'
      );
      $("#Terminal").append(
        '<i class="fa fa-facebook"></i>: <a href="https://www.facebook.com/" target="_blank">https://www.facebook.com/</a><br/><br/>'
      );
    }
    // sudo
    else if (
      CurrentCommand == "sudo" ||
      CurrentCommand == "su" ||
      CurrentCommand == "sudo su"
    ) {
      $("#Terminal").append(
        "nice try hacker! Here are some commands that you can use:<br/>"
      );
      $("#Terminal").append("<br/>hacker - generate a hacker name");
      $("#Terminal").append("<br/>hack &nbsp;&nbsp;- hack NASA with HTML<br/>");
    }
    // cpanel
    else if (
      CurrentCommand == "cp" ||
      CurrentCommand == "cpanel" ||
      CurrentCommand == "cpanelplugins"
    ) {
      window.open("https://cpanelplugins.com");
      $("#Terminal").append(
        'CpanelPlugins.com opened in a new window <i class="fas fa-external-link-alt"></i><br/>'
      );
    }
    // resume
    else if (CurrentCommand == "resume") {
      $("#Terminal").append(
        '<a href="./docs/dragan_cv.pdf" download="Dragan_CV"><u>Click here</u></a> to download my CV or type cv to open it in new window.<br/>'
      );
    }
    // cv
    else if (CurrentCommand == "cv") {
      window.open("./docs/dragan_cv.pdf");
      $("#Terminal").append(
        'CV opened in new window <i class="fas fa-external-link-alt"></i><br/>'
      );
    }
    //uname
    else if (CurrentCommand == "uname") {
      $("#Terminal").append("Linux<br/>");
    }
    //uname -r
    else if (CurrentCommand == "uname -r") {
      $("#Terminal").append("3.10.0-1160.49.1.el7.x86_64<br/>");
    }

    //date command
    else if (CurrentCommand == "date") {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formattedDate = now.toLocaleString("en-US", options);
      $("#Terminal").append(formattedDate + "<br/>");
    }

    //matrix
    else if (CurrentCommand == "matrix") {
      $("#Terminal").empty();
      $("#Terminal").append('<canvas id="canv"></canvas>');

      //matrix code
      const canvas = document.getElementById("canv");
      const ctx = canvas.getContext("2d");

      const w = (canvas.width = document.body.offsetWidth);
      const h = (canvas.height = document.body.offsetHeight);
      const cols = Math.floor(w / 20) + 1;
      const ypos = Array(cols).fill(0);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      function matrix() {
        ctx.fillStyle = "#0001";
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = "#0f0";
        ctx.font = "15pt monospace";

        ypos.forEach((y, ind) => {
          const text = String.fromCharCode(Math.random() * 128);
          const x = ind * 20;
          ctx.fillText(text, x, y);
          if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
          else ypos[ind] = y + 20;
        });
      }

      setInterval(matrix, 50);
    }
    //hacker name generator
    else if (CurrentCommand == "hacker") {
      var firstNames = [
        "1337",
        "t0xic",
        "phantom",
        "ALPhA",
        "v1rus",
        "biTe",
        "krypt0",
        "cyb3r",
        "Bi0",
        "acid",
        "gh0st",
        "Lord",
        "r4dical",
      ];
      var secondNames = [
        "PWNER",
        "H4X0R",
        "buRn",
        "MuX",
        "d3st0y3r",
        "phreak",
        "Plague",
        "0verride",
        "Chaos",
      ];
      function getHackerName() {
        var firstName =
          firstNames[Math.floor(Math.random() * firstNames.length)];
        var secondName =
          secondNames[Math.floor(Math.random() * secondNames.length)];
        return firstName + " " + secondName;
      }
      $("#Terminal").append("Your hacker name is: ").append(getHackerName);
    }
    //hack nasa with html
    else if (CurrentCommand == "hack") {
      $("#Terminal").empty();
      $("#Terminal").append('<div id="console"></div>');
      var intervalID = window.setInterval(updateScreen, 200);
      var c = document.getElementById("console");
      var txt = [
        "FORCE: XX0022. ENCYPT://000.222.2345",
        "TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1",
        "RETRY: REINDEER FLOTILLA",
        "Z:> /FALKEN/GAMES/TICTACTOE/ EXECUTE -PLAYERS 0",
        "================================================",
        "Priority 1 // local / scanning...",
        "scanning ports...",
        "BACKDOOR FOUND (23.45.23.12.00000000)",
        "BACKDOOR FOUND (13.66.23.12.00110000)",
        "BACKDOOR FOUND (13.66.23.12.00110044)",
        "...",
        "...",
        "BRUTE.EXE -r -z",
        "...locating vulnerabilities...",
        "...vulnerabilities found...",
        "MCP/> DEPLOY CLU",
        "SCAN: __ 0100.0000.0554.0080",
        "SCAN: __ 0020.0000.0553.0080",
        "SCAN: __ 0001.0000.0554.0550",
        "SCAN: __ 0012.0000.0553.0030",
        "SCAN: __ 0100.0000.0554.0080",
        "SCAN: __ 0020.0000.0553.0080",
      ];
      var docfrag = document.createDocumentFragment();
      function updateScreen() {
        //Shuffle the "txt" array
        txt.push(txt.shift());
        //Rebuild document fragment
        txt.forEach(function (e) {
          var p = document.createElement("p");
          p.textContent = e;
          docfrag.appendChild(p);
        });
        //Clear DOM body
        while (c.firstChild) {
          c.removeChild(c.firstChild);
        }
        c.appendChild(docfrag);
      }
    }
    //No command
    else if (CurrentCommand === "") {
    }
    //Unknown
    else {
      var NewLine =
        "<div id='notfound'>-bash: " +
        CurrentCommand +
        ": command not found </div>";
      $("#Terminal").append(NewLine);
    }
  }
}

//Generate id
function GenerateId() {
  return Math.random().toString(16).slice(2);
}
