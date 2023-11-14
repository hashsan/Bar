

export class Bar{
  bar;
  constructor(query,background,height){
    const parent = document.querySelector(query)
    if(!parent){
      parent =document.body
    }
    this.setStyle()
    this.bar = this.makedom(background,height)
    parent.append(this.bar)
  }
  go=(i)=>{
    const bar = this.bar  
    if(i===0){
      return this.remove()
    }
    if(i===100){
      return bar.classList.add('full')
    }
    bar.classList.add('mip')
  }

  ////
  makedom(background,height){
    //console.log(background,height)
    const bar = document.createElement('div')
    bar.classList.add('Bar')
    bar.style.background = background||'#f26'
    bar.style.height = height||'4px'
    //----
    bar.ontransitionend=()=>{
      //console.log('in?')
      if(!this.isfull()){ return }
      setTimeout(this.remove.bind(this),1000)
    }    
    //----
    return bar
  }
  isfull(){
    const bar = this.bar
    return bar.classList.contains('full')
  }
  remove(){
    //console.log('in???',this)
    const bar = this.bar    
    bar.classList.remove('mip')    
    bar.classList.remove('full')  
  }
  setStyle(){
    const cls ='barstyle'
    var el = document.querySelector('.'+cls)
    if(el){
      return;
    }
    el = document.createElement('style')
    el.classList.add(cls)
    el.innerHTML=`
.Bar{
  position:absolute;
  top:0;left:0;
  height:4px;
  width:0%;
  background:#f26;
}
.Bar.mip{
  transition:width 0.3s ease-in;  
  width:20%;  
}
.Bar.full{
  transition:width 0.3s ease-in;  
  width:100%;
}    
    `;
    document.body.append(el)
  }
}


var bar = new Bar('#bar','orange','8px')
bar.go(10)
document.querySelector('button').onclick=()=>{
  bar.go(100)
}
