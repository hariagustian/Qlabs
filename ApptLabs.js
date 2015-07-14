	//Qlabs author hari.agustian@rocketmail.com //V.1.01 https://github.com/hariagustian/ApptJs
	
	var qlabs = qobj = proto = filter = collect = constructLab = multi = single = callselectortags = string = dom = elementListener = listener = {}
	var stringObj = String.prototype, passDumpt = new Array();

	//http://www.htmlgoodies.com/html5/javascript/extending-javascript-objects-in-the-classical-inheritance-style.html
	var Class = function() {  
		var parent,
			methods,              
			klass = function() { 
			  this.initialize.apply(this, arguments); 
			  //copy the properties so that they can be called directly from the child
			  //class without $super, i.e., this.name
			  var reg = /\(([\s\S]*?)\)/;
			  var params = reg.exec(this.initialize.toString());
			  if (params) {
				var param_names = params[1].split(',');
				for ( var i=0; i<param_names.length; i++ ) {
				  this[param_names[i]] = arguments[i];
				}
			  }
			},
			extend = function(destination, source) {   
			  for (var property in source) {
				destination[property] = source[property];
			  }
					  //IE 8 Bug: Native Object methods are only accessible directly
					  //and do not come up in for loops. ("DontEnum Bug")
			  if (!Object.getOwnPropertyNames) {
				var objMethods = [
				   'toString'
				  ,'valueOf'
				  ,'toLocaleString'
				  ,'isPrototypeOf'
				  ,'propertyIsEnumerable'
				  ,'hasOwnProperty'
				];
			   
				for(var i=0; i<objMethods.length; i++) {
				 // if (  isNative(source,objMethods[i])
				  if (typeof source[objMethods[i]] === 'function'
					 &&      source[objMethods[i]].toString().indexOf('[native code]') == -1) {
					   document.writeln('copying ' + objMethods[i]+'<br>');
					   destination[objMethods[i]] = source[objMethods[i]];
				  }
				}
			  }
			 
			  destination.$super =  function(method) {
				return this.$parent[method].apply(this.$parent, Array.prototype.slice.call(arguments, 1));
			  }
			  return destination;  
		};
	   
		if (typeof arguments[0] === 'function') {       
		   parent  = arguments[0];       
		   methods = arguments[1];     
		} else {       
		   methods = arguments[0];     
		}     
	   
		if (parent !== undefined) {       
		   extend(klass.prototype, parent.prototype);       
		   klass.prototype.$parent = parent.prototype;
		}
		extend(klass.prototype, methods);  
		klass.prototype.constructor = klass;      
	   
		if (!klass.prototype.initialize) klass.prototype.initialize = function(){};         
	   
		return klass;   
	};
	
	
	//douglas crokford object create
	Object.build = function(o) {
		var initArgs = Array.prototype.slice.call(arguments,1)
		function F() {
		  if((typeof o.init === 'function') && initArgs.length) {
			 o.init.apply(this,initArgs)
		  }
		}
		F.prototype = o
		return new F()
	}
	
	//class of string
	string = Class({
		initialize:function(__args){
			//global args 
			this.args = __args
		},
		check:{
			json : function(){
				var index = this
				try {
					JSON.parse(index);
				} catch (e) {
					return false;
				}
				return true;
			},
			url :function(){
				var index = this;
				if((index.indexOf("http") > -1) === true){					
					return index = index.substr(index.indexOf('://')+3)
				}else{
					return index
				}
			},
			video :function(){
				var fileExtention = this.split('.').pop(),
				fileTypeArr = ['mp4'];
				var allow;
				for(var index=0;index<fileTypeArr.length;index++){
					if(fileTypeArr[index].toLowerCase() == fileExtention.toLowerCase()){
						allow = true;
						break;
					}
				}

				if(allow){
					return true;
				}else{
					return false;
				}
			},
			numeric:function(){
				var index = this,re = /^\d+$/;
				if(re.test(index)){
					return true
				}else{
					return false
				}
			},
			email:function(){
				var index = this,re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				if(re.test(index)){
					return true
				}else{
					return false
				}
			},
			phone:function(){
				var index = this,re = /^\d+$/;
				if(index.numericValidate() && index.length >= 6){
					return true
				}else{
					return false
				}
			},
			pass:function(){
				var index = this
				if (index.length >= 6){
					return true		    
				}else{
					return false
				}
			},
			pass:function(){
				var index = this
				if (index.length >= 6){
					return true		    
				}else{
					return false
				}
			},
			zipcode:function(){
				var index = this
				if (index.length == 5){	
					return true		    
				}else{
					return false
				}
			},
			strfilter:function(){
				var index = this,newIndex = index;
				if(newIndex.indexOf("|") > -1)
					newIndex = newIndex.split("|").join("*sparate");
				if(newIndex.indexOf("||") > -1)
					newIndex = newIndex.split("||").join("*sparatesparate");
				if(newIndex.indexOf("|||") > -1)
					newIndex = newIndex.split("|||").join("*sparatesparatesparate");
				if(newIndex.indexOf(".") > -1)
					newIndex = newIndex.split(".").join("*dot");
				if(newIndex.indexOf("-") > -1)
					newIndex = newIndex.split("-").join("*strip");
				if(newIndex.indexOf(",") > -1)
					newIndex = newIndex.split(",").join("*comma");
				return newIndex;
			},
			strremove:function(){
				var index = this,newIndex = index;
				if(newIndex.indexOf("script") > -1)
					newIndex = newIndex.split("script").join("");
				if(newIndex.indexOf("/script") > -1)
					newIndex = newIndex.split("/script").join("");
				if(newIndex.indexOf("<") > -1)
					newIndex = newIndex.split("<").join("");
				if(newIndex.indexOf(">") > -1)
					newIndex = newIndex.split(">").join("");
				return newIndex;
			},
			common:function(){
				var index = this,newIndex = index;
				if(newIndex.indexOf("script") > -1){
					return false;
				}else if(index.indexOf("script") > -1){
					return false;
				}else if(index.indexOf("<") > -1){
					return false;
				}else if(index.indexOf(">") > -1){
					return false;
				}else{
					return true;
				}
			}
		},
		strProto:function(){
			//defined string
			var str = new string(),
				__check = str.check;
			
			//str proto need to trigger to each function
			stringObj.IsJson = __check.json,
			stringObj.urlcheck = __check.url,
			stringObj.videoNameValidate = __check.video,
			stringObj.numericValidate = __check.numeric,
			stringObj.emailValidate = __check.email,
			stringObj.phoneValidate = __check.phone,
			stringObj.passValidate = __check.pass,
			stringObj.zipCodeValidate = __check.zipcode,
			stringObj.convertstr = __check.strfilter,
			stringObj.removeUnexpectedString = __check.strremove,
			stringObj.commonValidate = __check.common
		}
	});	
	
	var __string = new string()
	//declare sring proto
	__string.strProto()

	
	//class of dom
	dom = Class({
		prependObject:function(element, message, parentelement){
			switch (element.toLowerCase()){
				case 'label': element = document.createElement('label');break
				case 'li': element = document.createElement('li');break
			}						
			element.innerHTML = message;
			parentelement.innerHTML = "";
			parentelement.insertBefore(element,parentelement.firstChild)
		},
		appendObject:function (element, message, parentElement,fieldName){
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
		},
		appendObjectInArray : function (element, message, parentElement,fieldName){
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
	})
	
	var __dom = new dom()
	
	//class of listener
	listener = Class({
		add: function(element, evnt, funct){
			 listenerlist = function(evnt){
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
				   case 'mouseenter':	
					 if (element.attachEvent){
					  return element.attachEvent('onmouseenter', funct);
					 }else{
					  return element.addEventListener('mouseenter', funct, false);
					 }
				   case 'mouseleave':	
					 if (element.attachEvent){
					  return element.attachEvent('onmouseleave', funct);
					 }else{
					  return element.addEventListener('mouseleave', funct, false);
					 }
				   case 'keydown' :
					if (element.attachEvent){
					  return element.attachEvent('onkeydown', funct);
					}else{
					  return element.addEventListener('keydown', funct, false);
					}
				   case 'keyup' :
					if (element.attachEvent){
					  return element.attachEvent('onkeyup', funct);
					}else{
					  return element.addEventListener('keyup', funct, false);
					}
				   case 'keypress' :
					if (element.attachEvent){
					  return element.attachEvent('onkeypress', funct);
					}else{
					  return element.addEventListener('keypress', funct, false);
					}
				   case 'hover' :
					if (element.attachEvent){
					  return element.attachEvent('onmouseover', funct);
					}else{
					  return element.addEventListener('mouseover', funct, false);
					}
				   case 'hoverout' :
					if (element.attachEvent){
					  return element.attachEvent('onmouseout', funct);
					}else{
					  return element.addEventListener('mouseout', funct, false);
					}
				   case 'blur' :
					if (element.attachEvent){
					  return element.attachEvent('onblur', funct);
					}else{
					  return element.addEventListener('blur', funct, false);
					}
				   
				}
			}
			
			if(evnt instanceof Array == false){ 
				listenerlist(evnt);
			}else{
				for(var index = 0; index<evnt.length; ++index){
					listenerlist(evnt[index]);
				}
			}
	  },
	  off:function(element){
		 if(element instanceof Array == false){
			var element = [element]
		 } 
		 for(var index = 0; index<element.length; ++index){
			element[index].disabled = true
		 }
	  },
	  on:function(element){
		 if(element instanceof Array == false){
			var element = [element]
		 }
		 
		 for(var index = 0; index<element.length; ++index){  
			element[index].disabled = false
		 }
	  },
	  hide:function(element){
		if(element instanceof Array == false){
			var element = [element]
		}
		
		for(var index = 0; index<element.length; ++index){  
			element[index].style.display = 'none'
		}	
	  },
	  unhide:function(element){
		if(element instanceof Array == false){
			var element = [element]
		}
		
		for(var index = 0; index<element.length; ++index){  
			element[index].style.display = 'block'
		}	
		
	  },
	  getText:function(element){
		return (element.innerText || element.textContent);
	  }
	})
	
	var listener = new listener()
	
	//class of collect element
	collectElement = Class({
		retrieveelement:function(arrayelement, getelement){
			var getelement, index;
			for (index = 0; index < getelement.length; ++index) {
				arrayelement.push(getelement[index])
			}			
			return arrayelement;		
		},
		retrieveelementvalue:function(arrayelement, getelement,bind){
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
		},
		retrievemultitypeofelement:function(){
			var collect = new collectElement()
			var index = null,parentCETA = new Array(),
			containerallofelements = new Array(),
			containerelementtypearray = new Array(),
			elementtypearray = new Array()			
			
			function bodyFunction(a,b,c){
				containerallofelements = a, containerelementtypearray = b, elementtypearray = c;
				for (index = 0; index < elementtypearray.length; ++index) {					
					switch(elementtypearray[index].toLowerCase()){
						case 'input': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('input')]);break		
						case 'select': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('select')]);break;									
						case 'textarea': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('textarea')]);break;
						case 'button': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('button')]);break;
						case 'span': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('span')]);break;
						case 'label': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('label')]);break;						
						case 'div': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('div')]);break;
						case 'li': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('li')]);break;	
						case 'h3': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('h3')]);break;
						case 'h5': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('h5')]);break;
						case 'a': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('a')]);break;
						case 'i': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('i')]);break;
						case 'img': collect.retrieveelement.apply(this,[parentCETA,containerelementtypearray.getElementsByTagName('img')]);break;
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
						__collect.rollback();
						return bodySelector.apply(this,[bodyFunction.call(this,a,b,c),selector])
					  }						
					},
					elementInnerHTML : function (a,b,c,selector){
						__collect.rollback();
						parentCETA = bodyFunction.apply(this,[a,b,c]);
						return collect.retrieveelementvalue.apply(this,[containerallofelements, bodySelector.call(this,parentCETA,selector),'innerHTML']);				  
										
					},
					elementValue : function (a,b,c,selector){		
						__collect.rollback();
						parentCETA = bodyFunction.apply(this,[a,b,c]);
						return collect.retrieveelementvalue.apply(this,[containerallofelements, bodySelector.call(this,parentCETA,selector),'value']);						  					    											
					},
					rollback :function(){
						parentCETA.length = 0, containerallofelements.length = 0,containerelementtypearray.length = 0,elementtypearray = 0
						return true;
					}									    
			};	
		}
	})
	
	var collect = new collectElement(),
	__collect = collect.retrievemultitypeofelement();

	/**************/
	qlabs = {
			data:{
				url:'http://localhost/laravel/vidinvite/vidinvite/public/address/json',
				responseGlossary:[
					'loginTrue','loginFalse','unregisteredEmail',
					'insertTrue','insertFalse','sessionFalse',
					'deleteTrue','deleteFalse','deleteNull','updateTrue',
					'updateFalse','resetTrue','resetNull','resetSuccess',
					'vendorDataTrue'
				],
				msgGlossary:{
						ajaxTimeOut:'Jaringan terganggu, membangun koneksi ... ',
						ajaxReconnect:'Permintaan tampaknya akan sedikit lama ...',
						loading:'loading',
						tokenMis:'Sesi anda tela kadaluarsa kami akan merefresh laman ini'
					},
				contentType:["application/json;charset=UTF-8","application/x-www-form-urlencoded"]
			},
			elementName:function(){
				return{
					input 	: 'input',
					button 	: 'button',
					textarea: 'textarea',
					select 	: 'select',
					li 		: 'li',
					ul 		: 'ul',
					img		: 'img',
					span 	: 'span',
					div		: 'div',
					p		: 'p',
					label	: 'label',
					a		: 'a',
					str     : '~inavP'
				}
			},
			error:{	
				errConditions: function(element,index,getExceptional){
					aErr = new Array(),argsCondt = new Array();
					var activeEl = element[index];
					
					
					var coloring = function(index){
						!index ? 
							activeEl.style.backgroundColor = '#fff' : 
							activeEl.style.backgroundColor  = '#FFE8E8',
							//push error number
							typeof index == "number" ? argsCondt.push(index) : null;	
					}
					
					
					var value =	$.trim(element[index].value);
					if (getExceptional != 'throughElement'){
						if(value != ''){
							coloring(false)
							
							if(value.length >= 1 ){
							  
							  if (element[index].nodeName.toLowerCase() == el.input){
							  
								//numeric validation
								getExceptional == 'numeric' ? 
								( value.numericValidate() ? 
									coloring(false) : 
									coloring(3) 
								) : null;
								
								//email validation
								getExceptional == 'email' ? 
								( value.emailValidate() ? 
									coloring(false) : 
									coloring(4)  
								) : null;	
								
								//password validation
								if(getExceptional == 'password'){
									if(value.passValidate()){
										passDumpt.push(value)
										passDumpt.length === 2 ?
										( passDumpt[0] == passDumpt[1] ? 
												coloring(false) : 
												coloring(7) 
										) : null ;
										
									}else{
										coloring(6) 
									}						
								}
								
								//zipcode validation
								getExceptional == 'zipcode' ? 
								( value.zipCodeValidate() && value.numericValidate() ? 
									coloring(9) : 
									coloring(false) 
								) : null;
								
								//phone validation
								getExceptional == 'phone' ? 
								( value.phoneValidate()  ? 
									coloring(false) : 
									coloring(10) 
								) : null ;
								
								//video validation
								getExceptional == 'video' ? 
								( value.videoNameValidate() ? 
									coloring(false) : 
									coloring(12)
								) : null;
								
								
							  }else if(element[index].nodeName.toLowerCase() == el.select){
									value != 'none' ? null : coloring(5);
							  }
							  
							  if(getExceptional !== 'password'){
								value.commonValidate() ? null : coloring(8);
							  }
							}else{
								coloring(2)
							}				
						}else{
							coloring(1)
						}
					}
					
					if (element[index].nodeType === 1)		
						aErr.push(element[index].nodeName.toLowerCase());				
					return{
						elemenIndex : aErr,
						elementCheckResult : argsCondt
					}
				},
				grab:function(element,elExceptional){
					dumpRst = []
					passDumpt.length = 0;
					if (elExceptional !== null){
						for (var index = 0; index < element.length; index++){
							dumpRst.push(qlabs.error.errConditions.call(this,element,index,elExceptional[index]));
						}				  		 
					}else{
						for (var index = 0; index < element.length; index++){
							dumpRst.push(qlabs.error.errConditions.call(this,element,index,null))
						}
					}
					return dumpRst;
							
				},
				handler:function(objElement,domParent,fieldName,customMsg){
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
									case 8:									
										msgAppend.push($$.message_zL),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
										break
									case 9:									
										msgAppend.push($$.message_Zu),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
										break
									case 10:									
										msgAppend.push($$.message_zH),nameAppend.push(fieldName[j]),typeElement.push(createEl) 
										break
									case 11:									
										msgAppend.push(customMsg),nameAppend.push(fieldName[j]),typeElement.push(createEl)
										break
									case 12:
										msgAppend.push($$.message_Ai),nameAppend.push(fieldName[j]),typeElement.push(createEl)
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
						__dom.appendObjectInArray.call(this,typeElement,msgAppend,domParent,nameAppend);
					}	
		
				}
			},
			read:{
				json:function(respond){
					var element
					return JSON && JSON.parse(respond) || $.parseJSON(respond)
				}
			},
			serverResponse:function(args,bool,activeEl,activeElHtml){
				var readJsn = qlabs.read.json, rspGlossry = qlabs.data.responseGlossary
				function statusResponse(status,element){
					var arrExeceptionsMsg = ['insertTrue','loginTrue','deleteTrue',
											  'updateTrue','resetTrue','resetSuccess',
											  'vendorDataTrue'], 
						exception = false;
					//parent default
					var domParent = document.getElementById('alert-error'),customMsg,
						domSuccessParent = document.getElementById('alert-success');

					if(status === 'loginFalse')
						customMsg = $$.msgLoginFalse;
					else if(status === 'unregisteredEmail')
						customMsg = $$.unregisteredEmail;
					else if(status === 'insertFalse')
						customMsg = $$.insertFail;
					else if(status === 'sessionFalse')
						customMsg = $$.sessionFalse, location.reload();
					else if(status === 'updateFalse')
						customMsg = $$.updateFalse;	
					else if(status === 'deleteNull')
						customMsg = $$.deleteNull;
					else if(status === 'insertTrue')
						customMsg = $$.insertTrue;
					else if(status === 'resetTrue')
						customMsg = $$.resetTrue;
					else if(status === 'resetNull')
						customMsg = $$.resetNull;	
					else if(status === 'resetSuccess')
						customMsg = $$.resetSuccess;	
					else if(status === 'loginTrue')
						customMsg = $$.loginTrue;
					else if (status === 'vendorDataTrue')
						customMsg = $$.vendorDataTrue;
					else if(status === 'TokenMismatchException')
						customMsg = $$.TokenMis;
						
					for(var index = 0; index<arrExeceptionsMsg.length;index++){
						if(status == arrExeceptionsMsg[index]){
							var exception = true
							__dom.appendObject(el.span, customMsg, domSuccessParent, '')
							break;
						}
					}
					
					if(exception === false){
						qlabs.error.handler([{
								elemenIndex : ['true'],
								elementCheckResult : [11]}],
								domParent,[''],
								customMsg
						)
					}
					
				}
				
				
				if(args.responseText.IsJson() === true){
						var getResponse = readJsn(args.responseText);
						var glossary = rspGlossry;
						for(var index=0,len = glossary.length;index<len;index++){
							if(getResponse.serverResponse == glossary[index]){
								statusResponse.call(this,glossary[index],activeEl) 
							}
						}
					return getResponse.serverResponse;
				}else{
					//inValid responseText not Json Object
					//handling tokenmismatch laravel
					if(JSON.stringify(args.responseText).indexOf("TokenMismatchException") > -1){
						if(document.getElementById('alert-error')){
							__dom.appendObject(el.span, $$.TokenMis, document.getElementById('alert-error'), '')
						}else{
							pTimeOut = $('#long-splash');
							pTimeOut.find('abbr').html(msg.tokenMis)
							pTimeOut.fadeIn( 100 );
						}
					}
					
				}
			},
			helper:{
				handlingMismatch:function(data){
					//handling TokenMismatchException laravel
					if(JSON.stringify(data).indexOf("TokenMismatchException") > -1){
						pTimeOut.find('abbr').html(msg.tokenMis)
						pTimeOut.fadeIn( 100 );
						setTimeout(function(){
							//location.reload()
						},5000)
						
						return true;
					}else{
						return false;
					}
					
					
				}
			},
			ajax:{
				ajaxLib:function(getFunction,url,getData,handler,contentTyp,method){
					pTimeOut = $('#long-splash');			
					var data = false;
					var self = getFunction;

					if (window.XMLHttpRequest) {
						self.data = new XMLHttpRequest();
						pTimeOut.fadeIn( 100 );
					}else {
						self.data = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					
					self.data.callback = handler
					self.data.arguments = Array.prototype.slice.call(arguments, 2)
					self.data.onerror = function(e) {
						if(qlabs.helper.handlingMismatch(this.responseText) == true){
							//do nothing 
						}else{
							pTimeOut.find('abbr').html(msg.ajaxTimeOut)
							pTimeOut.fadeIn( 100 );
							
							method == 'typepost' ? self.data.open('POST', url, true) : self.data.open('GET', url, true);
							
							self.data.setRequestHeader("Content-Type", contentTyp);
							self.data.send(JSON.stringify(getData)); 
						}
					};
					self.data.onload = function () {						
						if(qlabs.helper.handlingMismatch(this.responseText) == true){
							//do nothing
						}else{	
							this.callback.apply(this, this.arguments);
							pTimeOut.fadeOut(1000);
						}
					};		

					self.data.timeout = 23000; //resend after 23 seconds elapsed
					 
					method == 'typepost' ? self.data.open('POST', url, true) : self.data.open('GET', url, true);
					

					if(contentTyp == qlabs.data.contentType[0]){
						self.data.setRequestHeader('X-CSRF-TOKEN', VidLib.token())
						self.data.setRequestHeader("Content-Type", contentTyp);	
						self.data.send(JSON.stringify(getData));
						
						self.data.ontimeout = function () {
							if(JSON.stringify(getData).indexOf("insert") > -1){
								//do nothing
							}else{
								if (this.status == 0) {
									pTimeOut.find('abbr').html(msg.ajaxReconnect)
									pTimeOut.fadeIn( 100 );
									
									method == 'typepost' ? self.data.open('POST', url, true) : self.data.open('GET', url, true);
			
									self.data.setRequestHeader("Content-Type", contentTyp);
									self.data.send(JSON.stringify(getData)); 		
								}
							}
							
						}
					}else if (contentTyp == qlabs.data.contentType[1]){		
						self.data.setRequestHeader("Content-Type", contentTyp);	
						self.data.send(getData);
						self.data.ontimeout = function () {
							if(JSON.stringify(getData).indexOf("insert") > -1){
								//do nothing
							}else{
								if (this.status == 0) {
									pTimeOut.find('abbr').html(msg.ajaxReconnect)
									pTimeOut.fadeIn( 100 );
								
									method == 'typepost' ? self.data.open('POST', url, true) : self.data.open('GET', url, true);
									
									self.data.setRequestHeader("Content-Type", contentTyp);	
									self.data.send(getData);
								}
							}
						}
					}		
				},
				alpha:function (geturl,sendData,alphaHandler) {
					if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof alphaHandler !== "undefined"){	
						qlabs.ajax.ajaxLib.apply(this,[this,geturl,sendData,alphaHandler, qlabs.data.contentType[0],'typepost'],this.responseText)														 							    			    
					}	

				},
				zeta:function (geturl,sendData,zetaHandler) {
					if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof zetaHandler !== "undefined"){					   
						qlabs.ajax.ajaxLib.apply(this,[this,geturl,sendData,zetaHandler, qlabs.data.contentType[1],'typepost'])														 							    			    
					}		   		
				},
				eta:function (geturl,sendData,etaHandler) {
					if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof etaHandler !== "undefined"){					   
						qlabs.ajax.ajaxLib.apply(this,[this,geturl,sendData,etaHandler, qlabs.data.contentType[1],'typeget'])														 							    			    
					}		   		
				},
				ommega:function(geturl,sendData,alphaHandler){
					if (typeof geturl !== "undefined" && typeof sendData !== "undefined" && typeof alphaHandler !== "undefined"){
																
					}
										 
				}		
			}
		}
	
	qlabs = Object.build(qlabs);
	
	var msg = qlabs.data.msgGlossary
	var postJson = qlabs.ajax.alpha
	var getJson = qlabs.ajax.eta
	var urlH = qlabs.data.url, 
		el = Object.build(qlabs.elementName())			
		
	

	filter = {
		ByClass : function(elements,nameOfClass,elName){
			classElemnts = []
			var elArr = __collect.element([],elements,[elName],[elName]);
			for (var index = 0; index < elArr.length;index++){
			
				if(elArr[index].className == nameOfClass){
					classElemnts.push(elArr[index])
				}
			}
			return classElemnts;
		}
	}
		
	filter = Object.build(filter)
	
	window.$$= null;	
	var constructLab = {
	  loadData: (function(callback,args){
		callback.apply(this,[urlH,null,function handlerAlpha() {
			 $$ = args.call(this,this.responseText)
			 
		}])			
	  })(getJson,qlabs.read.json) 
	}

	//collect extend qobj
	callselectortags = Class(collectElement,{		
		process:function(parent,arrElement,arrFieldName,arrExceptional,btn,handler){
			listener.add(btn,'do',function () {
				//set parent default
				if(parent == null) domParent = document.getElementById('alert-error');
				else domParent = parent;
				
				fieldName			= arrFieldName;			
				fieldExceptional    = arrExceptional;
				fieldElement 		= arrElement;
				getResult			= qlabs.error.grab(fieldElement,fieldExceptional)				
				isBoolean			= qlabs.error.handler(getResult,domParent,fieldName)	
			
				handler.call(this,isBoolean);
			})
		},
		get:{
			element:function(parent,elName){
				var inis = new callselectortags()
				__collect = inis.retrievemultitypeofelement();
	
				if(elName instanceof Array)
					return __collect.element([],parent,elName,elName);
				else
					return __collect.element([],parent,[elName],[elName]);
			},
			value:function(parent,elName){
				var inis = new callselectortags()
				__collect = inis.retrievemultitypeofelement();
			
				if(elName instanceof Array)
					return __collect.elementValue([],parent,elName,elName);
				else	
					return __collect.elementValue([],parent,[elName],[elName]);
			}
		}
	})
	
	
	qobj = new callselectortags;
		

	
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
			checkboxArr = [];
			
			do{
				if (checkbox[j].checked ==  true){
					checkboxArr.push(checkbox[j])
				}
				j++
			}
			while(j < checkbox.length)			
			return checkboxArr
		},checkboxVal:function(checkboxArr){
			var selectedCheckbox = single.checkbox(checkboxArr), selectedVal = [];
			for(var key in selectedCheckbox){
				if( selectedCheckbox.hasOwnProperty(key)) {
					if(selectedCheckbox[key].value !== 'on')
						selectedVal.push(selectedCheckbox[key].value);
				}
			}
			
			return selectedVal;
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



