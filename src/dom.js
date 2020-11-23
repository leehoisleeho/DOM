window.dom={
    create:function(string){
        const container = document.createElement("temlate")
        container.innerHTML = string.trim();
        return container.firstChild 
    },
    after:function(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling)
    },
    before:function(node,node2){
        node.parentNode.insertBefore(node2,node)
    },
    append:function(parent,node){
       parent.appendChild(node)
    },
    wrap:function(node,parent){
        dom.before(node,parent)
        dom.append(parent,node)
    },
    remove:function(node){
        node.parentNode.removeChild(node)
        return node
    },
    empty:function(node){
        const array=[]
        let xxx = node.firstChild   
        while(xxx){
            array.push(dom.remove(xxx))
            xxx= node.firstChild
        }
        return array
    },
    attr:function(node,name,value){
        if(arguments.length===3){
            node.setAttribute(name,value)
        }else if(arguments.length===2){
            return node.getAttribute(name)
        }
    },
    test:function(node,string){ //适配
        if(arguments.length===2){
            if("innerText" in node){
                node.innerText = string  //ie
            }else{
                node.innerContent = string //firefox / chrome
            }
        }else if(arguments.length===1){
            if("innerText" in node){
                return node.innerText
            }else{
               return node.innerContent
            }
        }
    },
    html:function(node,string){
        if(arguments===2){
            node.innerHTML = string
        }else if(arguments===1){
            return node.innerHTML
        }
    },
    style:function(node,name,value){
        if(arguments===3){
            //dom.style("div","color","red")
            node.style[name] = value
        }else if(arguments===2){
            if(typeof name === "string"){
                // dom.style(div,"color")
                return node.style[name]
            }else if(name instanceof Object){
                // dom.style(div,{color:"red"})
                const object = name
                for(let key in object){
                    node.style[key] = object[key]
                }
            } 
        }   
    },
    class:{
        add:function(node,className){
            node.classList.add(className)
        },
        remove:function(node,className){
            node.classList.remove(className)
        },
        has:function(node,className){
           return node.classList.contains(className)
        }
    },
    on:function(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off:function(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){
        return (scope || document).querySelectorAll(selector)
    },
    parent:function(node){
        return node.parent
    },
    children(node){
        return node.children
    },
    siblings(node){
       return Array.from(node.parentNode.children).filter(n=>{n !== node})
    },
    next:function(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous:function(){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = node.previousSibling
        }
        return x
    },
    index:function(node){
        const list = dom.children(node.parentNode)
        let i
        for(let i = 0 ; i<list.length;i++){
            if(list[i]===node){
                break
            }
        }
        return i + 1
    } 
}

