var character = [{
    name: 'Green Knight',
    num: 0,
    img: "url(assets/pics/GreenStart.png)",
    divId: 'green-knight',
    btn: 'success'
}, {
    name: 'Red Knight',
    num: 1,
    img: "url(assets/pics/redStart.png)",
    divId: 'red-knight',
    btn: 'danger'
}, {
    name: 'Blue Knight',
    num: 2,
    img: "url(assets/pics/BlueStart.jpg)",
    divId: 'blue-knight',
    btn: 'primary'
}]

function pageChange(pageNum) {
    if (pageNum == 1) {
        var page = document.getElementById("start-page");
        if (page.style.display === "none") {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    } else if (pageNum == 2) {
        var page = document.getElementById("main-game");
        if (page.style.display === "none") {
            page.style.display = "block";
        } else if (page.style.display = "block") {
            page.style.display = "none";
        }
    } else if (pageNum == 3) {
        var page = document.getElementById("over-page");
        if (page.style.display === "none") {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    }
}

function startPage() {
    document.getElementById('start-page').style.display = "block"
    var template = ``
    for (var i = 0; i < character.length; i++) {
        template += `<div class="col-2 start-img " id="${character[i].divId}" style="background-image: ${character[i].img}">
            <button class="btn btn-outline-${character[i].btn} btn-start" onclick="startGame(${[i]}); pageChange(1); pageChange(2);">Start</button>
            </div>`
    }
    document.getElementById('start-page').innerHTML = template
}

var choice = 0

startPage()

function Enemies(name, health, maxHealth, hits, damage, img, backImg, poisoned, shocked, frozen, attack,) {
    this.name = name
    this.health = health
    this.maxHealth = maxHealth
    this.hits = hits
    this.damage = damage
    this.img =img
    this.backImg = backImg
    this.poisoned =poisoned
    this.shocked = shocked
    this.frozen = frozen
    this.attack = attack
}

function EDef (quick, heavy, arrow, poison) {
    this.quick =quick
    this.heavy = heavy
    this.arrow = arrow
    this.poison = poison
}

function EAtt (attackName1, attackName2, attackName3, quick, heavy, range, rangebase, hitChance) {
    this.attackName1 =attackName1
    this.attackName2 = attackName2
    this.attackName3 = attackName3
    this.quick = quick
    this.heavy = heavy 
    this.range = range
    this.rangebase = rangebase
    this.hitChance = hitChance
}

var BarbDef = new EDef(15,20,10,15)
var BarbAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Arrow', 12, 20, 5, 5, [0, 1, 1, 2, 3])
var Barbarian = new Enemies('Barbarian', 100, 100, 0, BarbDef, ['assets/pics/barbarian.png', '300vh'], 'url("assets/pics/castle.jpg")', -1, 0, 0, BarbAtt) 
var ThiefDef = new EDef(10,15,25,10)
var ThiefAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Arrow', 5, 10, 20, 20, [0, 0, 1, 1, 1, 2, 3, 3])
var Thief = new Enemies('Barbarian', 100, 100, 0, ThiefDef, ['assets/pics/thief.png', '200vh'], 'url("assets/pics/forrest-background.jpg")', -1, 0, 0, ThiefAtt) 
var BearDef = new EDef(15,15,10,5)
var BearAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Ice Ball', 10, 15, 10, 10, [1, 1, 1, 1, 2, 3])
var Bear = new Enemies('Barbarian', 100, 100, 0, BearDef, ['assets/pics/bear.jpg.png', '200vh'], 'url("assets/pics/grass.jpg")', -1, 0, 0, BearAtt) 
var ConeDef = new EDef(10,10,10,1)
var ConeAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Arrow Rain', 10, 15, 25, 25, [0, 0, 1, 1, 1, 1, 2, 2, 3])
var Conehead = new Enemies('Barbarian', 150, 150, 0, ConeDef, ['assets/pics/conehead.png', '200vh'], 'url("assets/pics/wedding.jpg")', -1, 0, 0, ConeAtt) 
var BTDef = new EDef(15,20,15,15)
var BTAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Arrow', 10, 20, 15, 15, [0, 0, 0, 1, 1, 1, 2, 3])
var BeefyThief = new Enemies('Barbarian', 200, 200, 0, BTDef, ['assets/pics/beefy-thief.png', '200vh'], 'url("assets/pics/forrest-background.jpg")', -1, 0, 0, BTAtt) 
var FishDef = new EDef(15,20,5,10)
var FishAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Arrow', 15, 5, 0, 0, [0, 0, 0, 1, 1, 1, 2])
var Fishman = new Enemies('Barbarian', 150, 150, 0, FishDef, ['assets/pics/fishman.png', '200vh'], 'url("assets/pics/temple.jpg")', -1, 0, 0, FishAtt) 
var AlienDef = new EDef(15,20,10,15)
var AlienAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Laser', 10, 15, 20, 20, [0, 1, 1, 2, 3])
var Alien = new Enemies('Barbarian', 200, 200, 0, AlienDef, ['assets/pics/alien.png', '200vh'], 'url("ship.jpg")', -1, 0, 0, AlienAtt) 
var BossDef = new EDef(3,8,3,8)
var BossAtt = new EAtt('Quick Attack', 'Heavy Attack', 'Laser', 20, 30, 5, 5, [0, 0, 0, 2, 1])
var Boss = new Enemies('Barbarian', 400, 400, 0, BossDef, ['assets/pics/boss.png', '200vh'], 'url("assets/pics/bossbattle.jpg")', -1, 0, 0, BossAtt) 


var enemy = []

function addEnemy() {
    enemy.push(Barbarian)
    enemy.push(Thief)
    enemy.push(Bear)
    enemy.push(Conehead)
    enemy.push(BeefyThief)
    enemy.push(Fishman)
    enemy.push(Alien)
    enemy.push(Boss)
}

function Player(name, img, maxHealth, health, hits, attacks, item, healthBonus, sandBonus, shieldBonus, poison, lightning, ice, magicAtt){
    this.name = name
    this.img = img
    this.maxHealth = maxHealth
    this.health = health
    this.hits = hits
    this.attacks = attacks
    this.item =item
    this.healthBonus = healthBonus
    this.sandBonus = sandBonus
    this.shieldBonus = shieldBonus
    this.poison = poison
    this.lightning = lightning
    this.ice = ice
    this.magicAtt= magicAtt
}

var Greenknight = new Player('Green Knight',['assets/pics/greenknight.png', '200vh'], 100, 100, 0,['Quick', 'Heavy', 'Arrow'], [], 0, -1, -1, true, false, false, ['poison'])
var Redknight = new Player('Red Knight',['assets/pics/redknight.png', '200vh'], 100, 100, 0,['Quick', 'Heavy', 'Arrow'], [], 0, -1, -1, false, true, false, ['lightning'])
var Blueknight = new Player('Blue Knight',['assets/pics/blueknight.png', '200vh'], 100, 100, 0,['Quick', 'Heavy', 'Arrow'], [], 0, -1, -1, false, false, true, ['ice'])

// var greenknight = {
//     name: 'Green Knight',
//     img: ['assets/pics/greenknight.png', '200vh'],
//     maxHealth: 100,
//     health: 100,
//     hits: 0,
//     attacks: ['Quick', 'Heavy', 'Arrow'],
//     item: [],
//     healthBonus: 0,
//     sandBonus: -1,
//     shieldBonus: -1,
//     poison: true,
//     lightnig: false,
//     ice: false,
//     magicAtt: ['Poison'],
// }

// var redknight = {
//     name: 'Red Knight',
//     img: ['assets/pics/redknight.png', '200vh'],
//     maxHealth: 100,
//     health: 100,
//     hits: 0,
//     attacks: ['Quick', 'Heavy', 'Arrow'],
//     item: [],
//     healthBonus: 0,
//     sandBonus: -1,
//     shieldBonus: -1,
//     poison: false,
//     lightning: true,
//     ice: false,
//     magicAtt: ['lightning'],
// }

// var blueknight = {
//     name: 'Blue Knight',
//     img: ['assets/pics/blueknight.png', '200vh'],
//     maxHealth: 100,
//     health: 100,
//     hits: 0,
//     attacks: ['Quick', 'Heavy', 'Arrow'],
//     item: [],
//     healthBonus: 0,
//     sandBonus: -1,
//     shieldBonus: -1,
//     poison: false,
//     lightning: false,
//     ice: true,
//     magicAtt: ['ice'],
// }

var player = []

function addPlayer () {
    player.push(Greenknight)
    player.push(Redknight)
    player.push(Blueknight)
}

function attack(num, enemyChar) {
    var playerChoice = playerAttack(num, enemyChar)
    enemyChar.health -= playerChoice
    display(attackMess(playerChoice, enemyChar))
    update(enemyChar, 'enemyhealth')
    lightning(enemyChar)
    ice(enemyChar)
    var eAttack = enemyAttChoice(enemyChar)
    var enemyAttResult = enemyAttMess(enemyChar, eAttack)
    setTimeout(display, 3000, enemyAttResult)
    enemyDmg(eAttack, enemyChar, player[choice])
    enemyChar.hits++
    setTimeout(update, 3000, player[choice], 'playerhealth')
    shieldEnd(player[choice], enemyChar)
    sandEnd(player[choice], enemyChar)
    drawHits(enemy)
    setTimeout(poison, 5000, enemyChar)
    playerWin(enemy, player[choice])
}

var level = 0

var Item = function (itemName, itemMod, itemQ) {
    this.itemName = itemName
    this.itemMod = itemMod
    this.itemQ = itemQ
}

var items = {
    Potion: new Item("Health Potion", 25, 10),
    Shield: new Item("Shield", 0.5, 5),
    Sandwhich: new Item("Sandwhich", 2, 2)
}

function addItems(obj, playerChar) {
    playerChar.item.push(obj.Potion)
    playerChar.item.push(obj.Shield)
    playerChar.item.push(obj.Sandwhich)
}

function playerAttack(num, enemyChar) {
    if (num == 0) {
        return enemyChar.damage.quick
    } else if (num == 1) {
        var hitChance = Math.floor(Math.random() *3)
        if (hitChance >= 1) {
            return enemyChar.damage.heavy
        } else {
            return 0
        }
    } else if (num == 2) {
        var hitChance = Math.floor(Math.random() *4)
        if (hitChance >= 1) {
            return enemyChar.damage.arrow
        } else {
            return 0
        }
    }
}

function update(Char, charId) {
    var charHealth = Char.health
    if (charHealth > 0) {
        document.getElementById(charId).innerHTML = `<h4>${Char.name}'s Health:</h4>
        <div class="progress">
  <div class="progress-bar" role="progressbar" style="width: ${charHealth / 2}%;">${charHealth}</div>
    </div>`
    } else {
        document.getElementById(charId).innerHTML = `<h4>Health</h4>
        <div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>`
    }
}

function charName(name, nameId) {
    document.getElementById(nameId).innerText = name
}

function charImg(img, imgId) {
    document.getElementById(imgId).innerHTML = '<img src="' + img[0] + '" class="char-img" height="' + img[1] + '">'
}

function levelIncrease(enemy) {
    if (enemy[level].health <= 0) {
        level++
        update(enemy[level], 'enemyhealth')
        charName(enemy[level].name, 'enemyname')
        charImg(enemy[level].img, 'enemyimg')
        drawBackground(enemy[level])
    }
}

function enemyAttMess(enemyChar, randChoice) {
    var options = enemyChar.attack.hitChance
    var randAtt = options[randChoice]
    if (randAtt > 0) {
        if (randAtt == 1) {
            return enemyChar.name + ' used a ' + enemyChar.attack.attackName1
        } else if (randAtt == 2) {
            return enemyChar.name + ' used a ' + enemyChar.attack.attackName2
        } else if (randAtt == 3) {
            return enemyChar.name + ' fired an ' + enemyChar.attack.attackName3
        }
    } else if (randChoice == (enemyChar.attack.hitChance.length - 1)) {
        return enemyChar.name + ' is shocked and missed!'
    } else {
        return enemyChar.name + ' Missed!'
    }
}

function enemyAttChoice(enemyChar) {
    var attacks = enemyChar.attack.hitChance.length
    var randAtt = Math.floor(Math.random() * attacks)
    return randAtt
}

function enemyDmg(randChoice, enemyChar, playerChar) {
    var randAtt = enemyChar.attack.hitChance[randChoice]
    if (randAtt > 0) {
        if (randAtt == 1) {
            playerChar.health -= enemyChar.attack.quick
        } else if (randAtt == 2) {
            playerChar.health -= enemyChar.attack.heavy
        } else if (randAtt == 3) {
            playerChar.health -= enemyChar.attack.range
        }
    } else {
        playerChar.health -= 0
    }
}

function display(resultMess) {
    document.getElementById('display').innerText = resultMess
}

function attackMess(number, enemyChar) {
    if (number == 0) {
        return 'You Missed!'
    } else if (number == enemyChar.damage.quick) {
        return 'You used a Quick Attack!'
    } else if (number == enemyChar.damage.heavy) {
        return 'You used a Heavy Attack!'
    } else if (number == enemyChar.damage.arrow) {
        return 'You fired an Arrow!'
    }
}

function poisoned(enemyChar) {
    if (enemyChar[level].poisoned == 1) {
        enemyChar[level].health -= enemyChar[level].damage.poison
        return enemyChar[level] + 'is poisoned!'
    }
}

function useItem(num, playerChar, enemyChar) {
    if (num == 0) {
        if (playerChar.item[0].itemQ > 0) {
            playerChar.health += playerChar.item[0].itemMod
            update(playerChar, 'playerhealth')
            playerChar.item[0].itemQ -= 1
            drawItemInven(playerChar.item)
            document.getElementById('display').innerText = "You used a Health Potion!"
        } else {
            document.getElementById('display').innerText = "You're out of those!"
        }
    } else if (num == 1) {
        if (playerChar.item[1].itemQ > 0) {
            enemyChar[level].attack.range -= enemyChar[level].attack.range
            var quickReduce = (enemyChar[level].attack.quick / 2)
            var heavyReduce = (enemyChar[level].attack.heavy / 2)
            enemyChar[level].attack.quick -= quickReduce
            enemyChar[level].attack.heavy -= heavyReduce
            playerChar.item[1].itemQ -= 1
            drawItemInven(playerChar.item)
            document.getElementById('display').innerText = "Armored up!"
            playerChar.shieldBonus += 5
        } else {
            document.getElementById('display').innerText = "Better find cover!"
        }
    } else if (num == 2) {
        if (playerChar.item[2].itemQ > 0) {
            var modifier = playerChar.item[2].itemMod
            enemyChar[level].damage.quick += enemyChar[level].damage.quick
            enemyChar[level].damage.heavy += enemyChar[level].damage.heavy
            var healthIn = playerChar.health * modifier
            playerChar.health = healthIn
            update(playerChar, 'playerhealth')
            playerChar.item[2].itemQ -= 1
            drawItemInven(playerChar.item)
            document.getElementById('display').innerText = "You ate a Sandwhich!"
            playerChar.sandBonus += 5
        } else {
            document.getElementById('display').innerText = "Sorry, no free lunch here!"
        }
    }
}

function shieldEnd(playerChar, enemyChar) {
    if (playerChar.shieldBonus > 0) {
        playerChar.shieldBonus -= 1
    } else if (playerChar.shieldBonus == 0) {
        enemyChar.attack.range += enemyChar.attack.rangebase
        enemyChar.attack.quick += enemyChar.attack.quick
        enemyChar.attack.heavy += enemyChar.attack.heavy
        playerChar.shieldBonus -= 1
    }
}

function sandEnd(playerChar, enemyChar) {
    if (playerChar.sandBonus > 0) {
        playerChar.sandBonus -= 1
    } else if (playerChar.shieldBonus == 0) {
        var attDamage = enemyChar.damage
        attDamage.quick -= (attDamage.quick / 2)
        attDamage.heavy -= (attDamage.heavy / 2)
        playerChar.healthBonus -= playerChar.healthBonus
        playerChar.sandBonus -= 1
    }
}

function drawBackground(enemyChar) {
    document.getElementById('background-img').style.backgroundImage = enemyChar.backImg
}

function drawAttBtn(arr) {
    var template = `<h3>Attacks!</h3>`
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        template += `
        <button class="btn btn-outline-primary" onclick="attack(${[i]}, enemy[level]); levelIncrease(enemy)">${arr[i]}</button>`
    }
    document.getElementById('attack-btn').innerHTML = template
}

function drawItemBtn(arr, playerChar, enemyChar) {
    var template = `<h3>Items!</h3>`
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        template += `<button class="btn btn-outline-danger" onclick="useItem(${[i]}, player[choice], enemy)">${arr[i].itemName}</button>`
    }
    document.getElementById('item-btn').innerHTML = template
}

function totalHits(enemyChar) {
    var total = 0
    for (var i = 0; i < enemyChar.length; i++) {
        total += enemyChar[i].hits
    }
    return total
}

function drawHits(enemyChar) {
    document.getElementById('Hits').innerHTML = '<h4>Hits: ' + totalHits(enemyChar)
}

function drawItemInven(arr) {
    var template = ``
    for (var i = 0; i < arr.length; i++) {
        template += `<h5>${arr[i].itemName}: ${arr[i].itemQ}</h5>`
    }
    document.getElementById('itemInven').innerHTML = template
}

function magic(playerChar, enemyChar) {
    if (playerChar.poison == true && enemyChar[level].poisoned < 1) {
        enemyChar[level].poisoned += 5
        document.getElementById('display').innerText = enemyChar[level].name + ' is poisoned!'
    } else if (playerChar.magicAtt[0] == 'lightning' && enemyChar[level].shocked < 1) {
        enemyChar[level].shocked += 1
        document.getElementById('display').innerText = enemyChar[level].name + ' is shocked!'
    } else if (playerChar.magicAtt[0] == 'ice' && enemyChar[level].frozen < .5) {
        enemyChar[level].frozen += 1
        document.getElementById('display').innerText = enemyChar[level].name + ' is frozen!'
    }
}

function poison(enemyChar) {
    if (enemyChar.poisoned > 0) {
        enemyChar.health -= enemyChar.damage.poison
        document.getElementById('display').innerText = enemyChar.name + ' was hurt by poison!'
        update(enemyChar, 'enemyhealth')
        enemyChar.poisoned -= 1
    }
}

function lightning(enemyChar) {
    if (enemyChar.shocked == 1) {
        enemyChar.attack.hitChance.push(0)
        enemyChar.shocked -= 1
    }
}

function ice(enemyChar) {
    if (enemyChar.frozen == 1) {
        enemyChar.attack.quick -= (enemyChar.attack.quick / 2)
        enemyChar.attack.heavy -= (enemyChar.attack.heavy / 2)
        enemyChar.frozen -= .5
    } else if (enemyChar.frozen == .5) {
        enemyChar.frozen -= .5
    }
}

function drawMagicBtn(playerChar) {
    var template = `<h3>Magic!</h3>`
    for (var i = 0; i < playerChar.magicAtt.length; i++) {
        template += `<button class="btn btn-outline-success" onclick="magic(player[choice], enemy)">${playerChar.magicAtt[i]}</button> `
    }
    document.getElementById('magic-btn').innerHTML = template
}

function startGame(pick) {
    addEnemy()
    addPlayer()
    choice = pick
    update(player[choice], 'playerhealth')
    update(enemy[level], 'enemyhealth')
    charName(enemy[level].name, 'enemyname')
    charName(player[choice].name, 'playername')
    charImg(enemy[level].img, 'enemyimg')
    charImg(player[choice].img, 'playerimg')
    drawBackground(enemy[level])
    drawAttBtn(player[choice].attacks)
    addItems(items, player[choice])
    drawItemBtn(player[choice].item, player, enemy)
    drawHits(enemy)
    drawItemInven(player[choice].item)
    drawMagicBtn(player[choice])
}

function drawEndPage(outcome) {
    document.getElementById('end-page').style.display = "block"
    var endMess = outcome
    document.getElementById('end-page').style.backgroundImage = 'url("assets/pics/endgame.jpg")'
    document.getElementById('end-page').innerHTML = `<h2 class="mt-2">${endMess}</h2>
    <span class="mt-2">Hits: ${totalHits(enemy)}</span>
    <span class="mt-2">Enemies beat: ${level}</span>
    <button onclick="startPage(); pageChange(3)" class="mt-2 mb-2 btn btn-outline-light">Try again!</button>`
}

function playerWin(enemyArr, playerChar) {

    if (enemyArr.length == level) {
        pageChange(2)
        drawEndPage('You Win!')
    } else if (playerChar.health <= 0) {
        pageChange(2)
        drawEndPage('You Lose!')
    }
}
