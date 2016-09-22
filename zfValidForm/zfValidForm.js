(function($){
    // 默认全部配置;
    var config = {
	      "tipsStyle1Wh": 1,			//[样式一]震动幅度（px））
	   'vari':1 ,                     //震动变量（不要调）
	   'prevent':1                  //防止重复点击
    }
    var ruleType = {								
        "account" : /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/, 					//匹配字母开头，6-16字符，字母数字下划线
        "pwd" : /^.{6,18}$/, 											//匹配以字母开头，长度在6~18之间，只能包含字符、数字和下划线
        "email" : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,		//匹配Email
        "isChinese": /^[\u4e00-\u9fa5]{2,5}$/,	 						//匹配中文（至少2,5个汉字）
        "isQq": /^[1-9][0-9]{5,}$/,				 						//匹配QQ帐号
        "isInt1" : /^\d+$/, 											//匹配非负整数（正整数+0）
        "isInt2" : /^[0-9]*[1-9][0-9]*$/,  								//匹配正整数
    }		
  function vibration(){						
		if(config.vari%2==0){
			$('.err2').each(function(){
				var temp=parseInt($(this).css('paddingLeft'))+config.tipsStyle1Wh+'px';
				$(this).css('paddingLeft',temp);
			})
			config.vari++;
			
		}else{
			$('.err2').each(function(){
				var temp=parseInt($(this).css('paddingLeft'))-config.tipsStyle1Wh+'px';
				$(this).css('paddingLeft',temp);
			})
			config.vari++;
		}
  }
    function setStyle(options,status,isOk){ 
	$(options.node).parent('p').find('.right2,.err2').remove();  
        if(status==1){//radio或checkbox控件 验证成功
            if(isOk){//验证失败  
                $(options.node).parent('p').append("<span class='right2 '><img src='./right2.png'></span>");
            }else{//验证成功
                $(options.node).parent('p').append("<span class='err2'><img src='./err2.png'>"+options.errmsg+"</span");
            }
        }
        else{//其他控件   
            if(!isOk){//验证失败
					if(status==2){
						$(options.node).after("<span class='err2'><img src='./err2.png'>"+options.errmsg[1]+"</span>");
					}else if(status==3){
						$(options.node).after("<span class='err2'><img src='./err2.png'>"+options.errmsg[0]+"</span>");
					}else{
						$(options.node).after("<span class='err2'><img src='./err2.png'>"+options.errmsg+"</span>");
							}
			}else{//验证成功
					 $(options.node).after("<span class='right2'><img src='./right2.png'> </span>");
			 }
        } 
    }
    $.extend({
	    zfValidForm : function(options){
			if(config.prevent!=1  ){	return;}
			 config.prevent=2;
             var ruleAdd = options.ruleAdd;
             var settings = $.extend(true, ruleType, options.ruleAdd);
             for(var i=0;i<ruleAdd.length;i++){
                   var val=$(ruleAdd[i]['node']).val();
                   if(ruleAdd[i].ruleType=='account' || ruleAdd[i].ruleType=='pwd' || ruleAdd[i].ruleType=='isChinese'||ruleAdd[i].ruleType=='isQq'||ruleAdd[i].ruleType=='email'){
                       var reg=new RegExp(settings[ruleAdd[i].ruleType]);
					   
                       if(!reg.test(val)){
                          setStyle(ruleAdd[i]);
                       }else{
                           setStyle(ruleAdd[i],0,1);
                       }
                   }
                   if(ruleAdd[i].ruleType=='isEq'){
                       $(ruleAdd[i].node).next().remove('span');
                       if($(ruleAdd[i].node).val()==''){
                           setStyle(ruleAdd[i],2);
                       }
                       else if(!($(ruleAdd[i].node).val()==$(ruleAdd[i].node2).val())){
                           setStyle(ruleAdd[i],3);
                       }else{
                           setStyle(ruleAdd[i],0,1);
                       }
                   }
                   if(ruleAdd[i].ruleType=='select'){
                       if(val=='')
                           setStyle(ruleAdd[i]);
                       else
                           setStyle(ruleAdd[i],0,1);
                   }
                   if(ruleAdd[i].ruleType=='checkbox'||ruleAdd[i].ruleType=='radio'){
                        if(typeof $(ruleAdd[i].node+':checked').val()=='undefined'){
                            setStyle(ruleAdd[i],1);		
                       }else{
                           setStyle(ruleAdd[i],1,1);
                       } 
                	}
					  if(ruleAdd[i].ruleType=='other'){
                        if(ruleAdd[i].condition()){
                            setStyle(ruleAdd[i]);		
                       }else{
                           setStyle(ruleAdd[i],0,1);
                       }
                	}
					if(ruleAdd[i].ruleType=='othercheck'){
                        if(typeof $(ruleAdd[i].node+':checked').val()=='undefined'){
                            setStyle(ruleAdd[i],1);
                       }else{
                           setStyle(ruleAdd[i],1,1);
                       } 
                	}
			 }
				   if(options.tipsStyle=='2'){
					   var tt=setInterval(vibration,options.vibconfig.vebspeed);
					   var cc=setTimeout(function(){
					   clearInterval(tt);
					   $('.err2,.right2').fadeOut(options.vibconfig.tipsmsgFadeTime1);
					   config.prevent=1;
							},options.vibconfig.tipsmsgvibTime);
				   }
				   if(options.tipsStyle=='1'){
						  $('.err2,.right2').fadeOut(options.vibconfig.tipsmsgFadeTimeo);
						  config.prevent=1;
				   }
	    }
    })
})(jQuery);
