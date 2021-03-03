<template>
  <div id="wrapper" ref="wrapper">
    <ul>
        <slot></slot>
    </ul>
</div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
    mounted(){
        this.iscroll=new IScroll(this.$refs.wrapper,{
            //  mouseWheel: true,
            // scrollbars: true,
            // disablePointer:true,
            // disableTouch:false,
            // disableMouse:true,
            // // click:true,
            // taps:true
            probeType:3,
             scrollbars: false,
                mouseWheel: false,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true,
                scrollY: true,
                scrollX:false,
                probeType: 2,
                bindToWrapper: true,
                click: true,
                taps:true,
     
   
    
   
        })
        setTimeout(()=>{
            // console.log(this.iscroll.maxScrollY);
            this.iscroll.refresh()
            //  console.log(this.iscroll.maxScrollY);
        },500)
    },
    methods:{
        scrolling(fn){
            this.iscroll.on("scroll",function(){
                fn(this.y)      
            });              
        },
        refresh(){
           setTimeout(()=>{
                this.iscroll.refresh()
           },100)
        },
        scrollTo(x,y,time){
            this.iscroll.scrollTo(x,y,time)
        }
    }

}
</script>

<style>
#wrapper{
    width: 100%;
    height: 100%;
}
</style>