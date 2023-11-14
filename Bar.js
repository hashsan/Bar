

export class Bar{
  bar;
  constructor(query,background,height){
    let parent = document.querySelector(query)
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
    bar.style.width = i + '%'
    bar.classList.add('trans')
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
    //console.log(!!parseInt(bar.style.width))
    return !! (parseInt(bar.style.width) > 99);
  }
  remove(){
    //console.log('in???',this)
    const bar = this.bar    
    bar.classList.remove('trans')
    bar.style.width = 0;
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
.Bar.trans{
  transition:width 0.3s ease-in;  
}
    `;
    document.body.append(el)
  }
}

/*
var bar = new Bar('#bar','orange','8px')
bar.go(15)
document.querySelector('button').onclick=()=>{
  bar.go(100)
}
*/
