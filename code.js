    let TimeoutId;
    let Danger = 0;
    let sides = false;
    let SpawnE;
    let CheckC;
    let Timer;
    let mode;
    let name;
    
    const Player = document.getElementById("Player");
    const Enemy = document.getElementById("Enemy");
    const BG = document.getElementById("back");
    const TextTile = document.getElementById("TextTile");
    const TileBack = document.getElementById("Tile");

    // name = prompt();

    function GameStart() {
        TileBack.style.display = "inline";
        TextTile.style.display = "inline"; 
        TextTile.innerHTML = `<br><br><br> Pilot <input id='name' type='text' placeholder='Your name'> ! You've got to save us! We've just flown into a flock of birds! Please maneuver us around them I will try to help you I'll by calling out their positions, steer us to safety, before it's too late! Please choose the dificulty you want to continue with:`;
    }

    Buttons = document.querySelectorAll(".buttons")
    Buttons.forEach(e => {
        e.addEventListener("click", () => {
            name = document.getElementById('name').value;
            Timer = Date.now();
            if (e.innerText == "Easy") {
                mode = "Easy";
                SpawnE = setInterval(SpawnEnemy, 800);
            } else if (e.innerText == "Medium") {
                mode = "Medium";
                SpawnE = setInterval(SpawnEnemy, 400);
            } else if (e.innerText == "Hard") {
                mode = "Hard";
                SpawnE = setInterval(SpawnEnemy, 200);
            } 
            CheckC = setInterval(CheckAllCollision, 30)
            TileBack.style.display = "none";
            TextTile.style.display = "none";
            Buttons.forEach(e => {
                e.style.display = "none";
            });
        });
    });
      
    GameStart();

    function SpawnClouds() {
        CloudNumber = Math.floor(Math.random() * 3);
        CloudPosition = Math.floor(Math.random() * 10) + 1;
        let Cloud = document.createElement("div");
        Cloud.classList.add("clouds");
        if (CloudNumber == '0') {
            Cloud.style.backgroundImage = "url('Cloud1.png')";
        } else if (CloudNumber == '1') {
            Cloud.style.backgroundImage = "url('Cloud2.png')";
        } else if (CloudNumber == '2') {
            Cloud.style.backgroundImage = "url('Cloud3.png')";
        }
    
        Cloud.style.left = (CloudPosition / 10 * BG.offsetWidth) - 100 + "px";
        BG.appendChild(Cloud);

        setTimeout(() => {
            Cloud.remove();
        }, 3000);
    }

    setInterval(SpawnClouds, 300);

    function SpawnEnemy() {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");

        let Danger = Math.floor(Math.random() * 70);
        let DangerType = Math.floor(Math.random() * 4);

        if (DangerType == '0') {
                enemy.style.filter = "hue-rotate(240deg)";
        } else if (DangerType == '1') {
                enemy.style.filter = "hue-rotate(0deg)";
        } else if (DangerType == '2') {
                enemy.style.filter = "hue-rotate(60deg)"; // 240 blue, 0 red , 70 yellow, 180 green
        } else if (DangerType == '3') {
                enemy.style.filter = "hue-rotate(180deg)";
        }

        if (Danger <= '35') {
            enemy.style.left = BG.offsetLeft - 31 + "px";
            enemy.style.top = 20 * Danger + "px";
            enemy.danger = Danger;
        
        } else if (Danger <= '70') {
            enemy.style.left =  BG.offsetLeft + BG.offsetWidth + 1 + "px";
            enemy.style.top = 20 * (Danger - 35) + "px";
            enemy.danger = Danger;

        } else if (Danger <= '105') {
            enemy.style.left = 20 * (Danger - 70) + BG.offsetLeft + "px";
            enemy.style.top = BG.offsetTop + "px";
            endX = 20 * (Danger - 70) + BG.offsetLeft + "px";
            endY = BG.offsetTop + BG.offsetHeight + "px";
            enemy.style.backgroundImage = "url('caution.png')";
            enemy.style.backgroundSize = "cover";
        } else {
            enemy.style.left = 20 * (Danger - 105) + BG.offsetLeft + "px";
            enemy.style.top = BG.offsetTop + BG.offsetHeight - 30 + "px";
            endX = 20 * (Danger - 105) + BG.offsetLeft + "px";
            endY = BG.offsetTop + "px";

            enemy.style.backgroundImage = "url('caution.png')";
            enemy.style.backgroundSize = "cover";
        }

        enemy.style.backgroundImage = "url('caution.png')";
        enemy.style.backgroundSize = "cover";
        document.body.appendChild(enemy);

        setTimeout(() => {

            if (DangerType == '0') {
                enemy.style.filter = "hue-rotate(0deg) brightness(60%)";
                enemy.birdColor = "blue";
                setTimeout(() => {
                    enemy.remove();
                }, 1500);                
            } else if (DangerType == '1') {
                enemy.classList.add("wobly")
                enemy.style.filter = "hue-rotate(120deg) brightness(50%)";
                enemy.birdColor = "red";
            } else if (DangerType == '2') {
                enemy.classList.add("turnaround")
                enemy.style.filter = "hue-rotate(170deg) brightness(60%)"; // 0 blue, 120 red , 180 yellow, 250 green
                enemy.birdColor = "yellow";
            } else if (DangerType == '3') {
                enemy.style.filter = "hue-rotate(250deg) brightness(60%)";
                enemy.birdColor = "green";
            }

            if (Danger <= '35') {
                endX = BG.offsetLeft + BG.offsetWidth - 50 + "px";
                endY = 20 * Danger + "px";
                enemy.classList.add("sides");
                if (DangerType == '3') {
                    enemy.style.transform = "translateX(1000px)";
                    setTimeout(() => {
                        enemy.remove();
                    }, 300); 
                }
            } else if (Danger <= '70') {
                endX = BG.offsetLeft + "px";
                endY = 20 * (Danger - 35) + "px";
                enemy.classList.add("sides");
                enemy.style.transform = "scaleX(-1)";
                if (DangerType == '3') {
                    enemy.style.transform = "translateX(-1000px)";
                    setTimeout(() => {
                        enemy.remove();
                    }, 250); 
                }
                enemy.turned = 1;
            }
            enemy.style.height = "21px";
            enemy.style.left = endX;
            enemy.style.top = endY;
            enemy.style.backgroundImage = "url('Bird.png')";
            enemy.style.backgroundSize = "auto";
            AnimateEnemy(enemy, 5, 30, 150);
        }, 1500);
    }


    function AnimateEnemy(enemy, frameCount, frameWidth, speed) {
        let currentFrame = 0;
        setInterval(() => {
            enemy.style.backgroundPosition = `-${currentFrame * frameWidth}px 0px`;
            currentFrame = (currentFrame + 1) % frameCount;
        }, speed);
    }

    function CheckCollision(player, enemy) {
        const pRect = player.getBoundingClientRect();
        const enRect = enemy.getBoundingClientRect();

        return !(
            pRect.top > enRect.bottom ||
            pRect.bottom < enRect.top ||
            pRect.left > enRect.right ||
            pRect.right < enRect.left
        );
    }

    function WoblyBobly() {
        const Wob = document.querySelectorAll(".wobly");
        Wob.forEach(e => {
            if (e.turned == 1) {
                e.style.transform = "scaleX(-1) translateY(100px)";
                setTimeout(() => {
                    e.style.transform = "scaleX(-1) translateY(0)";
                }, 500);
            } else {
                e.style.transform = "translateY(100px)";
                setTimeout(() => {
                    e.style.transform = "translateY(0)";
                }, 500);
            }
            setTimeout(() => {
                e.remove();
            }, 1500);
        })
    }

    function Turn() {
        const TurnV = document.querySelectorAll(".turnaround");
        TurnV.forEach(e => {
            setTimeout(() => {
                if (e.turned == 1) {
                    e.style.transform = "scaleX(1)";
                    e.style.left =  BG.offsetLeft + BG.offsetWidth - 30 + "px";
                    e.style.top = 20 * (e.danger - 35) + "px";
                } else {
                    e.style.transform = "scaleX(-1)";
                    e.style.left = BG.offsetLeft + "px";
                    e.style.top = 20 * e.danger + "px";
                }
            }, 1500);

            setTimeout(() => {
                e.remove();
            }, 3000);
        });
    }

    setInterval(WoblyBobly, 500);
    setInterval(Turn, 500);

    function CheckAllCollision() {
        const enemies = document.querySelectorAll(".enemy");
        enemies.forEach(e => {
            if (CheckCollision(Player, e)) {
                document.getElementById("Tile").style.display = "inline";
                TextTile.style.display = "inline"; 
                Buttons.forEach(e => {
                    e.style.display = "inline";
                });
                TimeS = Math.floor((Date.now() - Timer) / 1000)
                TextTile.innerText = "oh No! Your ballon has been destroyed by a " + e.birdColor + " bird! You had survived for " + TimeS + " seconds in " + mode + " mode. Please choose the dificulty you want to continue with:";
                clearInterval(SpawnE);
                clearInterval(CheckC);
                enemies.forEach(e => {
                    e.remove();
                });
                DatabaseCall(1, name, TimeS, mode);
            }
        });
    }

    function Call() {
        if (Player.offsetTop <= '700') {
            Player.style.top = Player.offsetTop + 1 + "px"; 
        }
        const sides = document.querySelectorAll(".sides");
        const cloudsV = document.querySelectorAll(".clouds");
        sides.forEach(e => {
            let top = parseInt(e.style.top) || 0;
            e.style.top = top + 4 + "px";
        });
        cloudsV.forEach(e => {
            let top = parseInt(e.style.top) || 0;
            e.style.top = top + 4 + "px";
        });
        requestAnimationFrame(Call); 
    }

    requestAnimationFrame(Call); 

    function MovePlayer() {
        duration = 200;
        const start = performance.now();
        const initialTop = Player.offsetTop;
        const targetTop = initialTop - 50;

        function step(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);

            Player.style.top = (initialTop + (targetTop - initialTop) * progress) + "px";

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === " " || event.key === "w") {
            if (Player.offsetTop >= '120') {
                MovePlayer();
            }
            const cloudsV = document.querySelectorAll(".clouds");
            cloudsV.forEach(e => {
                let top = parseInt(e.style.top) || 0;
                e.style.top = top + 4 + "px";
            });
        }
    })

    document.addEventListener("mousemove", (event) => {
        let newX = event.clientX - Player.offsetWidth / 2;
        newX = Math.max(0, BG.offsetLeft + 35 + Math.min(BG.offsetWidth - 18 - Player.offsetWidth, newX));
        Player.style.left = newX + "px";

    })
