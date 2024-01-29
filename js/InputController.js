//Google Mats icons 
var optionsIcons = [['lightbulb_outline'],
['looks_one', 'looks_two', 'looks_3', 'looks_4'],
['filter_1', 'filter_2', 'filter_3'],
['brightness_1', 'brightness_1', 'brightness_1', 'brightness_1', 'brightness_1', 'brightness_1']]

var optionsColors = [['#5DE0C3'],
['#5DE0C3', '#5DE0C3', '#5DE0C3', '#5DE0C3'],
['#5DE0C3', 'fil#5DE0C3ter_2', '#5DE0C3'],
['#f4a700', '#ff1900', '#b700ff', '#00ff6a', '#a89990','#000000']]

var allMenus = document.querySelectorAll('.menu')
var AllOptions = document.querySelectorAll('.option')

//Ham
let hamIcon = new HamButton(document.querySelector('#ham2'), allMenus)
var menuBtn = []

hamIcon.htmlElem.addEventListener('click', () => {
  hamIcon.toggleSelfSelection()
  hamIcon.toggleFold()
  //fold options from menu if open
  if(hamIcon.selectedChildIndex != undefined){
    if (menuBtn[hamIcon.selectedChildIndex].htmlElem.classList.contains('selected')) {
      menuBtn[hamIcon.selectedChildIndex].foldChildren()
    }
  }
})

//Menus
for (let i = 0; i < allMenus.length; i++) {
  menuBtn[i] = new MenuButton(allMenus[i], AllOptions, i, optionsIcons[i], optionsColors[i])
  //first option group is switcher like behaviour
  if (i != 0) {
    menuBtn[i].fixedChildren = true
    menuBtn[i].lastClickedChild = 0
  }
  menuBtn[i].htmlElem.addEventListener('click', () => {
    hamIcon.jumpSelectedChildTo(i)
    hamIcon.registerChildSelection = i
    toggleMenu(i)
  })
}

async function toggleMenu(i) {
  await menuBtn[i].foldChildren()
  await wait(menuBtn[i].transTime * menuBtn[i].children.length)

  if (menuBtn[i].htmlElem.classList.contains('selected')) {
    await menuBtn[i].unfoldChildren()
    //select last option clicked
    await menuBtn[i].jumpSelectedChildTo(menuBtn[i].lastClickedChild)
  }
  await menuBtn[i].feedChildrenWithColoredIcons()
}

//Options
var optionsBtn = []
for (let i = 0; i < AllOptions.length; i++) {
  optionsBtn[i] = new UIOption(AllOptions[i], i)

  optionsBtn[i].htmlElem.addEventListener('click', () => {
    //Grab PArent
    let optionParent = optionsBtn[i].getParentMenu(menuBtn)
    let menuIndex = parseInt(optionParent.htmlElem.id.charAt(4))

    //Handle Options
    //isFixed
    if (optionParent.fixedChildren) {
      optionParent.jumpSelectedChildTo(i)
      if (optionParent.lastClickedChild != i) {
        console.log('ACTION FIXED')
        changeConfiguration(menuIndex, i)
      }
      optionParent.lastClickedChild = i;
    }

    //is switcher like behaviour
    else {
      console.log('ACTION NON FIXED')
      changeConfiguration(menuIndex, i)
      optionsBtn[i].toggleSelfSelection()
      if (optionsBtn[i].htmlElem.classList.contains('selected')) {
        optionParent.lastClickedChild = 0;

      }
      else
        optionParent.lastClickedChild = undefined;
    }
  })
}

//ACTION FUNCTIONS
var LightSwitchOn = false
let EnvSwitch = false
let showCommands = false

function changeConfiguration(menu, option){
  switch (menu) {
    case 0:
      console.log('CHANGE LIGHTING')
      pressLightSwitcher()
      break;
    case 1:
      console.log('CHANGE RIMS')
      userChangedRims(option)
      break;
    case 2:
      console.log('CHANGE ENV')
      userChangedEnv(option)
      break;
    case 3:
      console.log('CHANGE COLORS')
      userChangedColors(option)
      break;
  }

}

function pressLightSwitcher(){
  LightSwitchOn = !LightSwitchOn
  if (LightSwitchOn) {
    UpdateAnimRate = true
  }
  else {
    TurnLightsOff()

  }
}

function userChangedRims(i){
      //set out mat:
      wheelMatOut.albedoTexture = wheelMatIn.albedoTexture
      wheelMatOut.metallicTexture = wheelMatIn.albedoTexture
  
      wheelAnimOut.restart()
  
      var wheelSelec = i
      window.setTimeout(() => {
        switch (wheelSelec) {
          case 0:
            wheelMatIn.albedoTexture = wheelAlbedo[0]
            wheelMatIn.metallicTexture = wheelMetal[0]
            break;
          case 1:
            wheelMatIn.albedoTexture = wheelMatIn.ambientTexture
            wheelMatIn.metallicTexture = wheelMetal[1]
            break;
          case 2:
            wheelMatIn.albedoTexture = wheelAlbedo[2]
            wheelMatIn.metallicTexture = wheelMetal[1]
            break;
          case 3:
            wheelMatIn.albedoTexture = wheelAlbedo[3]
            wheelMatIn.metallicTexture = wheelMetal[1]
            break;
        }
  
      }, (10 / 25) * 1000)
}

function userChangedEnv(i){
  var envSelec = i
  switch (envSelec) {
    case 0:
      changeEnv(hdrTexture, 1)
      break;
    case 1:
      changeEnv(hdrTextureCity, 1)
      break;
    case 2:
      changeEnv(hdrTextureStudio, 0)
      break;
  }
}

function userChangedColors(option){
  coatMat.albedoColor = new BABYLON.Color3.FromHexString(optionsColors[3][option])

}


//SHOW CLICKED ELEMENT
document.addEventListener('click', function (e) {
  e = e || window.event;
  console.log(e.target);
}, false);

//WAIT
async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}