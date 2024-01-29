class UIElem {
    constructor(htmlElem, children) {
        this.htmlElem = htmlElem
        this.children = children
        this.selectedChildIndex = undefined
        this.isOpen = false
    }

    get mainClass() {
        return this;
    }
    get openState() {
        return this.isOpen;
    }
    //Setter
    set openState(state) {
        this.isOpen = state
    }

    toggleSelfSelection() {
        this.htmlElem.classList.toggle('selected')
    }

    deselectAllChildren() {
        for (let j = 0; j < this.children.length; j++) {
            this.children[j].classList.remove('selected')
        }
    }

    async jumpSelectedChildTo(i) {
        //console.log(this.children[i])
        for (let j = 0; j < this.children.length; j++) {
            if (j == i)
                this.children[j].classList.add('selected')
            else
                this.children[j].classList.remove('selected')
        }
    }

}
class HamButton extends UIElem {
    constructor(htmlElem, children) {
        super(htmlElem, children)
        this.lastClicked = undefined
        this.sameChildClicked = false
        
    }

    set registerChildSelection(index) {
        this.selectedChildIndex = index
    }

    toggleFold() {
        if (this.htmlElem.classList.contains('selected')) {
            //console.log('FOLD')
            this.deselectAllChildren()
        }
        else {
            //console.log('UNFOLD')
        }
        let stagger = 0;
        for (let i = 0; i < this.children.length; i++) {
            stagger += 50
            window.setTimeout(() => {
                this.children[i].classList.toggle('open')
            }, stagger)
        }
    }
}

class MenuButton extends UIElem {
    constructor(htmlElem, children, index, icons, colors) {
        super(htmlElem, children)
        this.index = index
        this.icons = icons
        this.colors = colors
        this.transTime = 50
        this.lastClickedChild = 1
        this.fixedChildren = false
    }


    async foldChildren() {
        let stagger = this.transTime;
        for (let i = 0; i < this.children.length; i++) {
            stagger += 50
            window.setTimeout(() => {
                this.children[i].classList.remove('open')
            }, stagger)
        }
        this.openState = false
    }

    async unfoldChildren(){
        //console.log('UNFOLD')
        let stagger = this.transTime;
        for (let i = 0; i < this.icons.length; i++) {
            stagger += 50
            window.setTimeout(() => {
                this.children[i].classList.add('open')
            }, stagger)
        }
        this.openState = true
    }

    async feedChildrenWithColoredIcons() {
        //console.log('FEEDING')
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].textContent = ''
            let para = document.createElement("i");
            para.classList.add('material-icons')
            para.setAttribute('style', 'color: ' + this.colors[i] + '');
            para.innerHTML = this.icons[i]
            this.children[i].appendChild(para)
        }
    }

}

class UIOption extends UIElem {
    constructor(htmlElem, index) {
        super(htmlElem);
        this.index = index
    }

    getParentMenu(){
        for (let menu of menuBtn) {
            if (menu.htmlElem.classList.contains('selected')) {
              return menu
            }
          }

    }
}