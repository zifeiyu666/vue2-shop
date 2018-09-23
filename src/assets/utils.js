// 滚动到指定标准
export function scrollTo (target){
  var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
  if (scrollT >target) {
      var timer = setInterval(function(){
          var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
          var step = Math.floor(-scrollT/6);
          document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
          if(scrollT <= target){
              document.body.scrollTop = document.documentElement.scrollTop = target;
              clearTimeout(timer);
          }
      },20)
  }else if(scrollT == 0){
      var timer = setInterval(function(){
          var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
          var step = Math.floor(300/3*0.7);
          document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
          console.log(scrollT)
          if(scrollT >= target){
              document.body.scrollTop = document.documentElement.scrollTop = target;
              clearTimeout(timer);
          }
      },20)
  }else if(scrollT < target){
      var timer = setInterval(function(){
          var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
          var step = Math.floor(scrollT/6);
          document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
          if(scrollT >= target){
              document.body.scrollTop = document.documentElement.scrollTop = target;
              clearTimeout(timer);
          }
      },20)
  }else if(target == scrollT){
      return false;
  }
}