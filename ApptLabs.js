		qwertLabs = {
			data:function(){
				return{
					url: "http://localhost/laravel/toko/toko/public/admin/json"			
				}
			},
			serverResponse:function(){
				return {
					msg_Xa : 'MsgFailPasswordIsWrong',
					msg_Xb : 'MsgFailUserNotRegistered',
					msg_Xc : 'MsgAuthISuccess',
					msg_Xd : 'MsgFailAlreadyExist',
					msg_Xe : 'MsgSuccessUpdate',
					msg_Xf : 'MsgSuccessDelete',
					msg_Xg : 'MsgSuccessInsert',
					msg_Xh : 'MsgSuccessSelect',
				}		
			},
			elementName:function(){
				return{
					input 	: 'input',
					button 	: 'button',
					select 	: 'select',
					li 		: 'li',
					ul 		: 'ul',
					span 	: 'span',
					div		: 'div',
					p		: 'p',
					label	: 'label',
					a		: 'a',
					str     : '~inavP'
				}
			}
		}
		
		function prependObject(element, message, parentelement){
				switch (element.toLowerCase()){
					case 'label': element = document.createElement('label');break
					case 'li': element = document.createElement('li');break
				}						
				element.innerHTML = message;
				parentelement.innerHTML = "";
				parentelement.insertBefore(element,parentelement.firstChild)

		}	
		
		//dom last child append error message
		function elemntdom(element, message, parentelement, container){
			element.innerHTML = message;
			element.setAttribute("class", domspan);															
			parentelement.appendChild(element);					
		}

		//dom last child append element object
		function appendObject(element, message, parentElement,fieldName){
			switch (element.toLowerCase()){
				case 'span': element = document.createElement('span');break
				case 'li': element = document.createElement('li');break
				case 'label': element = document.createElement('label');break
				case 'a': element = document.createElement('a');break					
			}
			parentElement.innerHTML = "";				
			
			if(parentElement.parentNode.style.display == "none")
				parentElement.parentNode.style.display = "block"
			
			if (parentElement.style.display == "none")
				parentElement.style.display = "block"
				
			if (fieldName === null){
				if (element.nodeName.toLowerCase() == 'a'){																	
					element.innerHTML = '<a href="http://'+message+'">'+message+'</a>';
				}else{				
					element.innerHTML = message;
				}
				
				if (element.nodeName.toLowerCase() == 'span'){																	
					element.setAttribute("class", "domspan");
				}		
			}else{
				element.innerHTML = fieldName+" "+message;			
			}	
					
			parentElement.appendChild(element);
	
		}

		function appendObjectInArray(element, message, parentElement,fieldName){
			parentElement.innerHTML = "";
			
			if(parentElement.parentNode.style.display == "none")
				parentElement.parentNode.style.display = "block"
			
			if (parentElement.style.display == "none")
				parentElement.style.display = "block"			
				
			for(var index=0;index<element.length;index++){
	
				switch (element[index].toLowerCase()){
					case 'span': elmnt = document.createElement('span');break
					case 'li': elmnt = document.createElement('li');break				
				}			

				if (fieldName === null){
					elmnt.innerHTML = message[index];																			
				}else{
					elmnt.innerHTML = fieldName[index]+" "+message[index];			
				}	
						
				parentElement.appendChild(elmnt);
			}
		}
		

		String.prototype.urlcheck = function(char) {
		    var index = this;
			if((index.indexOf("http") > -1) === true){					
				return index = index.substr(index.indexOf('://')+3)
			}else{
				return index
			}
		};


		function ascyFunc (){
			return{
				disabled: function(element){
				  for(var index = 0; index<element.length; ++index){
					element[index].disabled = true
				  }
				},
				enabled: function(element){
				  for(var index = 0; index<element.length; ++index){  
				    element[index].disabled = false
				  }
				},
				none: function(element){
				  for(var index = 0; index<element.length; ++index){  
				    element[index].style.display = 'none'
				  }				
				},
				block: function(element){
				  for(var index = 0; index<element.length; ++index){  
				    element[index].style.display = 'block'
				  }				
				},
				text: function(element){
					return (element.innerText || element.textContent);
				}				
			}
		}	
			
		xFunc = new ascyFunc()
									
		//function global for get element		
		function retrieveelement(arrayelement, getelement){
			var getelement, index;
			for (index = 0; index < getelement.length; ++index) {
				arrayelement.push(getelement[index])
			}			
			return arrayelement;		
		}

		//function global for get element with value		
		function retrieveelementvalue(arrayelement, getelement,bind){
			var getelement, index;
			dumpArray = new Array();
			switch(bind){
			 case 'value':
				for (index = 0; index < getelement.length; ++index) {
					dumpArray.push(getelement[index].value)
				}			
				return dumpArray;
				break;
			 case 'innerHTML':
				for (index = 0; index < getelement.length; ++index) {
					dumpArray.push(getelement[index].innerHTML)
				}			
				return dumpArray;
				break;
			}			 	
		}

		//function global get multi tag base on name of element with or without bind
		function retrievemultitypeofelement(){
			var index = null,parentCETA = new Array(),containerallofelements = new Array(),containerelementtypearray = new Array(),elementtypearray = new Array()											  		
		  	function bodyFunction(a,b,c){
		    	containerallofelements = a, containerelementtypearray = b, elementtypearray = c;
				for (index = 0; index < elementtypearray.length; ++index) {					
					switch(elementtypearray[index].toLowerCase()){
						case 'input': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('input')]);break		
						case 'select': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('select')]);break;									
						case 'textarea': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('textarea')]);break;
						case 'button': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('button')]);break;
						case 'span': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('span')]);break;
						case 'label': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('label')]);break;						
						case 'div': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('div')]);break;
						case 'li': retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('li')]);break;						
					}
				}
				return parentCETA;
			}
			function bodySelector(elements,selector){
				var a = 0, b = new Array()
				for (var index = 0; index < selector.length;index++){
					for (var a = 0; a < elements.length;a++){
						if (elements[a].nodeName.toLowerCase() === selector[index]){
							b.push(elements[a])
						}						
					}
					
				}	
				return b	
			}					
			return {
					element : function(a,b,c,selector){
					  if (selector === false){					
						return bodyFunction.apply(this,[a,b,c]);
					  }else{
						getallof.rollback();
					  	return bodySelector.apply(this,[bodyFunction.call(this,a,b,c),selector])
					  }						
					},
					elementInnerHTML : function (a,b,c,selector){				
					    parentCETA = bodyFunction.apply(this,[a,b,c]);
					    return retrieveelementvalue.apply(this,[containerallofelements, bodySelector.call(this,parentCETA,selector),'innerHTML']);				  
					    				
					},
					elementValue : function (a,b,c,selector){		
						getallof.rollback();
					    parentCETA = bodyFunction.apply(this,[a,b,c]);
					    return retrieveelementvalue.apply(this,[containerallofelements, bodySelector.call(this,parentCETA,selector),'value']);						  					    											
					},
					rollback :function(){
						parentCETA.length = 0, containerallofelements.length = 0,containerelementtypearray.length = 0,elementtypearray = 0
						return true;
					}									    
			};		
		}
				

	   //global custom capca
		function randomstr(){
			return{
				customRange : function(range){
					return Math.floor(Math.random() * range) + 1
				},
				array: function(array){
					return Math.floor(Math.random()* array.length);
				}
			
			}
		}
				
		function customcapca(){
		  return {
		  		validate : function (container,containerError) {
					capcaSpan = new Array(),capcaInput = new Array()
					var getCapcaVariables = retrieveelementvalue(capcaSpan, container.getElementsByTagName('span'),'innerHTML')
					var getCapcaInput = retrieveelement(capcaInput, container.getElementsByTagName('input'))
					var getCapcaSpan = retrieveelement(capcaInput, container.getElementsByTagName('span'))		
					var sum = getCapcaVariables.slice(0,-2)
					switch (sum[1]){
						case '+':sum = parseInt(sum[0]) + parseInt(sum[2]),operator = 'Penjumlahan';break;
						case '-':sum = parseInt(sum[0]) - parseInt(sum[2]),operator = 'Pengurangan';break;
						case '*':sum = parseInt(sum[0]) * parseInt(sum[2]),operator = 'Perkalian';break;						
					}
					if (getCapcaInput[0].value != ''){
						if (parseInt(getCapcaInput[0].value) === sum){
							getCapcaInput[0].disabled=true;
							return true;
						}else{						
							getCapcaInput[0].value = "";
							prependObject('label',''+operator+' salah !',containerError)
								getCapcaInput[1].innerHTML = random.customRange(10)
								var arrayOperator = new Array(),arrayOperator = ['+','-','*']
								getCapcaInput[2].innerHTML = arrayOperator[random.array(arrayOperator)]
								getCapcaInput[3].innerHTML = random.customRange(10)
							return false;						
						}
					}else{					
						getCapcaInput[0].focus()
						prependObject('label','Capcanya tidak boleh kosong!',containerError)
						return false;						
					}
				},
				loadcapca : function(array){
					array[0].innerHTML = random.customRange(10)
					var loadOperator = new Array(),loadOperator = ['+','-','*']
					array[1].innerHTML = loadOperator[random.array(loadOperator)]
					array[2].innerHTML = random.customRange(10)						
				}			
		  }					
		}
 		var json = new Array;		
		function sendpost(){
			var contentType = ["application/json;charset=UTF-8","application/x-www-form-urlencoded"]
			function getSpot () {
				this.callback.apply(this, this.arguments) 
			}

			function postType(getFunction,url,getData,handler,contentTyp,method){			
			    var data = false;
			    var self = getFunction;
			    
			 	if (window.XMLHttpRequest) {
			 	 self.data = new XMLHttpRequest();
			 	}else {
			     self.data = new ActiveXObject("Microsoft.XMLHTTP");
			 	} 
			 	
		        self.data.callback = handler
		   		self.data.arguments = Array.prototype.slice.call(arguments, 2)
				self.data.onload = getSpot;		
				
				if(method == 'typepost'){
			    self.data.open('POST', url, true);
				}else if(method == 'typeget'){
					 self.data.open('GET', url, true);
				}
				
			    if(contentTyp == 'application/json;charset=UTF-8'){
				    self.data.setRequestHeader("Content-Type", contentTyp);	
					self.data.send(JSON.stringify(getData));				
				}else if (contentTyp == 'application/x-www-form-urlencoded'){		
					self.data.setRequestHeader("Content-Type", contentTyp);	
					self.data.send(getData);
				}
			}		
									
			return{
				alpha:function (geturl,sendData,alphaHandler) {
				    if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof alphaHandler !== "undefined"){	
				    	postType.apply(this,[this,geturl,sendData,alphaHandler,contentType[0],'typepost'])														 							    			    
				 	}				 						    
		   		},
		   		zeta:function (geturl,sendData,zetaHandler) {
				    if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof zetaHandler !== "undefined"){					   
				    	postType.apply(this,[this,geturl,sendData,zetaHandler,contentType[1],'typepost'])														 							    			    
				 	}		   		
		   		},
		   		eta:function (geturl,sendData,zetaHandler) {
				    if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof zetaHandler !== "undefined"){					   
				    	postType.apply(this,[this,geturl,sendData,zetaHandler,contentType[1],'typeget'])														 							    			    
				 	}		   		
		   		},
		   		ommega:function(geturl,sendData,alphaHandler){
				    if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof alphaHandler !== "undefined"){
					   						    			    
				 	}
				    					 
				}
			}	
		}

		function getpost(){
		    var element
			return{
				beta:function(respond){
 	 	   			return JSON && JSON.parse(respond) || $.parseJSON(respond)
				}
			}
		}
			
	  function setCookie(c_name,value,exdays){
	      var exdate=new Date();
	      exdate.setDate(exdate.getDate() + exdays);
	      var c_value=escape(value) + 
	        ((exdays==null) ? "" : ("; expires="+exdate.toUTCString()));
	      document.cookie=c_name + "=" + c_value;
	    }
	
	   function getCookie(c_name){
	     var i,x,y,ARRcookies=document.cookie.split(";");
	     for (i=0;i<ARRcookies.length;i++){
		      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		      x=x.replace(/^\s+|\s+$/g,"");
		      if (x==c_name){
		       return unescape(y);
		      }
	     }		
	 	} 
		function attachlistener(){
		   return {
		      add: function(element, evnt, funct){
		         switch(evnt){
		           case 'do':
				     if (element.attachEvent){
				      return element.attachEvent('onclick', funct);
				     }else{
				      return element.addEventListener('click', funct, false);
				     }
				   	 break
				   case 'ch':	
				     if (element.attachEvent){
				      return element.attachEvent('onchange', funct);
				     }else{
				      return element.addEventListener('change', funct, false);
				     }
				   case 'popstate':	
				     if (element.attachEvent){
				      return element.attachEvent('onpopstate', funct);
				     }else{
				      return element.addEventListener('popstate', funct, false);
				     }
				     
			     } 
		  	  },
		  	  off:function(element){
		  	  	xFunc.disabled.apply (xFunc, [element]);
		  	  },
		  	  on:function(element){
		  	  	xFunc.enabled.apply (xFunc, [element]);
		  	  },
		  	  hide:function(element){
		  	  	xFunc.none.apply (xFunc, [element]);
		  	  },
		  	  unhide:function(element){
		  	  	xFunc.block.apply (xFunc, [element]);
		  	  },
		  	  pushUrl:function(serverResponse,targetUrl){
				var now = new Date();
				var time = now.getTime();
				var expireTime = time + 1000*36000;
				document.cookie = 'currentState' + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
		  	  	setCookie.call(this,'currentState',targetUrl,now.setTime(expireTime))
		  	  	if (serverResponse !== null){
			  	  	document.open();
						document.write(serverResponse);															
					document.close();		  	 
				} 
				window.history.pushState({path:document.URL},'',document.URL);
				window.history.pushState({path:targetUrl},'',targetUrl);					
		  	  }
		  	} 
		}
		
		var getallof = new retrievemultitypeofelement(),random = new randomstr(),customcapca = new customcapca(),send = new sendpost(),got = new getpost(),listener = new attachlistener(),validate = new parentFunc(),urlH = new qwertLabs.data().url, srvRsnp = Object.create(qwertLabs.serverResponse()),el = Object.create(qwertLabs.elementName())

		window.$$= null;	
		var constructLab = {
		  loadData: (function(callback,args){
			callback.apply(this,[urlH,null,function handlerAlpha() {
				 $$ = args.call(this,this.responseText)
				 
			}])			
		  })(send.alpha,got.beta) 
		}
		


		function parentFunc(sRespond,domParent) {
		  var url,sRespond;
		  if(typeof sRespond !== "undefined"){
		    switch(sRespond.toLowerCase()){
		    	case srvRsnp.msg_Xa:self.location = $$.address_Xb;break
		   		case srvRsnp.msg_Xb:appendObject.call(this,'span',$$.message_Xa,domParent,null); break;
		   		case srvRsnp.msg_Xc:appendObject.call(this,'span',$$.message_Xb,domParent,null); break;		   		
		    }
		  }
		}

		parentFunc.prototype.checking = function (sRespond, domParent) {
		  parentFunc.apply(undefined, [sRespond, domParent]);		 
		};

		String.prototype.numericValidate = function(char) {
		    var index = this,re = /^\d+$/;
	    	if(re.test(index)){
	    		return true
	    	}else{
	    		return false
	    	}
    
		};
		
		String.prototype.emailValidate = function(char) {				
		    var index = this,re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	    	if(re.test(index)){
	    		return true
	    	}else{
	    		return false
	    	}
    
		};
		
		String.prototype.passValidate = function(char) {				
		    var index = this
		    if (index.length >= 6){
		    	
				return true		    
		    }else{
	    		return false
	    	}
    
		};	
		
		passDumpt = new Array();
		
		var error = {	
			errConditions: function(element,index,getExceptional){
				aErr = new Array(),argsCondt = new Array();
				var value =	element[index].value;
				if (getExceptional != 'throughElement'){
					if( value !== ''){
						if(value.length >= 1 ){
						  if (element[index].nodeName.toLowerCase() == el.input){						
							if(getExceptional == 'numeric'){
						    	if(value.numericValidate() === true){
						    		
						    	}else{
						    		argsCondt.push(3)
						    	}	
							}
							if(getExceptional == 'email'){
						    	if(value.emailValidate() === true){
						    		
						    	}else{
						    		argsCondt.push(4)
						    	}						
							}
							if(getExceptional == 'password'){
						    	if(value.passValidate() === true){
						    		passDumpt.push(value)
						    		if(passDumpt.length === 2){
						    			if(passDumpt[0] == passDumpt[1]){
						    				
						    			}else{
						    				argsCondt.push(7)
						    			}
						    		}
						    		
						    	}else{
						    		argsCondt.push(6)
						    	}						
							}							
						  }else if(element[index].nodeName.toLowerCase() == el.select){
								if( value != 'none'){
								
								}else{
									argsCondt.push(5)
								}
						  }
						}else{
							argsCondt.push(2)
						}				
					}else{
						argsCondt.push(1)
					}
				}
				
				if (element[index].nodeType === 1)		
					aErr.push(element[index].nodeName.toLowerCase());
										
				return{
					elemenIndex : aErr,
					elementCheckResult : argsCondt,
				}
			},
			grab:function(element,elExceptional){
				dumpRst = []
				passDumpt.length = 0;
				
				if (elExceptional !== null){
					for (var index = 0; index < element.length; index++){
						dumpRst.push(error.errConditions.call(this,element,index,elExceptional[index]));
					}				  		 
				}else{
					for (var index = 0; index < element.length; index++){
						dumpRst.push(error.errConditions.call(this,element,index,null))
					}
				}
				return dumpRst;
						
			},
			handler:function(objElement,domParent,fieldName){
				var j=0, elmnt, createEl, elParentName = domParent.nodeName.toLowerCase();
				msgAppend = [], nameAppend = [], reCheck =[], typeElement =[];
				
				if(elParentName == el.ul)
				  createEl = el.li;
				else if(elParentName == el.div || elParentName == el.p || elParentName == el.span)
				  createEl = el.span;
				else
				  createEl = el.label;
				  
				do {	
											
					if (objElement[j].elementCheckResult.length !== 0){
					  	conditions = objElement[j].elementCheckResult; 
						for (var x=0;x<conditions.length;x++){
							switch(conditions[x]){
								case 1:
									msgAppend.push($$.message_Xc),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
									break
								case 2:
									msgAppend.push($$.message_Xd),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
									break										
								case 3:
									msgAppend.push($$.message_Xe),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
									break
								case 4:
									msgAppend.push($$.message_Xf),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
									break
								case 5:									
									msgAppend.push($$.message_Xg),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
									break
								case 6:									
									msgAppend.push($$.message_Xh),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
									break
								case 7:									
									msgAppend.push($$.message_Xj),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
									break																															
							}
						}
					}else{
						reCheck.push(objElement[j].elementCheckResult.length)
					}
										
				    j++
				}
				while (j < objElement.length);	
				if (reCheck.length === objElement.length){
				
					if(domParent.parentNode.style.display == "block")
						domParent.parentNode.style.display = "none";
					
					if (domParent.style.display == "block")
						domParent.style.display = "none";

					return true
				}else{
					appendObjectInArray.call(this,typeElement,msgAppend,domParent,nameAppend);
				}	
	
			}	
		}
		multi ={
			check:function(fields,check){
				var k = 0,l = 0;									
				function trickyRadio(element,numEl){
					listener.add(element,'ch',function () {
						if (element.checked == true){
							fields[numEl].checked = true						
							check.apply(this, [fields[numEl]]) 		
						}else{
							fields[numEl].checked = false						
							check.apply(this, [fields[numEl]]) 		
						}
									
					})				
				}
				
				do{
					new trickyRadio(fields[k],k);
					k++
				}
				while(k < fields.length)			
			}
		}
		single = {
			radio:function(fields,radio){
				var k = 0,l = 0;									
				function trickyRadio(element,numEl){
					listener.add(element,'ch',function () {
						if (element.checked == true){
							fields[numEl].checked = true						
							for(var l = 0; l < fields.length;l++){
							   if (numEl !== l){
								fields[l].checked = false
							   }
							}
							
							radio.apply(this, [fields[numEl]]) 		
						}	
									
					})				
				}
				
				do{
					new trickyRadio(fields[k],k);
					k++
				}
				while(k < fields.length)			
			},
			checkbox:function(checkbox){
				var j = 0;
				checkboxArr = []
				do{
					if (checkbox[j].checked ==  true){
						checkboxArr.push(checkbox[j])
					}
					j++
				}
				while(j < checkbox.length)			
				return checkboxArr
			},
			select:function(fields,select){
				var l = 0;
				function trickySelect(element,numEl){
					listener.add(element,'ch',function () {
					 	select.apply(this, [element[numEl]])
					})
				}
				do{
					new trickySelect(fields[l],l);
					l++
				}
				while(l < fields.length)					
			}
		}
			
	    var callselectortags = {		
			construct:function(element,select,getValueType,booleaN) {
				  switch(getValueType){
				    case null:	
					    body = document.body,array = new Array();
						if(false === booleaN)
							return getallof.element(array,body,element,select);
						else if(true === booleaN)
						    return getallof.rollback(),getallof.element(array,body,element,select);
					case 'innerHTML':
					    body = document.body,array = new Array();
						if(false === booleaN)
							return getallof.elementInnerHTML(array,body,element,select);
						else if(true === booleaN)
						    return getallof.rollback(),getallof.elementInnerHTML(array,body,element,select);
					case 'Value':
					    body = document.body,array = new Array();
						if(false === booleaN)
							return getallof.elementValue(array,body,element,select);
						else if(true === booleaN)
						    return getallof.rollback(),getallof.elementValue(array,body,element,select);							    			    
				  }	       
			}
	   };
	   
	   window.history.pushState(document.url,'',document.url);
