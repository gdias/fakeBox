/*
 *  Fakebox Plugin for jQuery, version 0.1
 *  G. DIAS COELHO
 *  http://guillaumedias.fr
 * 
 *  Plugin transform combobox in list item control 
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://jquery.org/license
 * 
 */

(function($){
    $.fakebox = function(el, options){
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data("fakebox", base);
        
        base.init = function(){
            base.options = $.extend({},$.fakebox.defaultOptions, options);
            
            base.$el.css('display','none');
            base.heightItem = 0;
            createElem(base.$el);
            
            var construct  = "#"+base.$el.attr("id")+"_clone";
            base.wrapper = $(construct);
			base.handler = $("a",construct);        
            base.container = $("ul",construct);  
            base.item = $("ul li", construct);
            base.$hasHeader = 1;
			base.nbItems = $('option',base.$el).size();
			base.radio = $("input[type=radio]",base.wrapper)
			
            if (base.options.targetEffect == "list") { // list mode
            	 // open list with effect and speed option
            	 base.handler.eq(1).click(function(){
            	 	base.radio.focus();
            	 	// invert mode
	        	 	if (base.options.openStyle == "inverse") {
	        	 		// configure position for invert effect
	        	 		var decalageInvert = ((base.nbItems-1)*base.heightItem)+base.handler.height();
        	 		
	        	 		base.container.css({
	        	 			'bottom':'-'+decalageInvert+'px',
	        	 			'top':'auto'
	        	 		});
	        	 	}
	        	 	
	        	 	// Animation
					base.container.slideToggle(base.options.openSpeed, base.options.easing, function(){
	        	 		if (!$(this).hasClass('open'))
	        	 			$(this).addClass("open");
	        	 		else
	        	 			$(this).removeClass("open");
	        	 	});

            	 	return false;
            	 });
            	
            } else if (base.options.targetEffect == "item" && base.options.openEffect == "normal") {

            	base.item.css("opacity",0);
            	effect = base.options.openEffect;
            	// Events
	            base.handler.eq(1).toggle(function(e){
	            	e.stopPropagation();
			    	toggleCombo(base.container,1,effect);
			    	base.radio.focus();
			    	return false;
			    },function (e){
			    	base.radio.blur();
			    	e.stopPropagation();
			    	toggleCombo(base.container,0,effect);
			    	return false;
			    });
			    
			    
            } else if (base.options.targetEffect == "item" && base.options.openEffect == "stair") {
            	
            	effect = base.options.openEffect;
            	
            	base.handler.eq(1).toggle(function(e){
	            	e.stopPropagation();
			    	toggleCombo(base.container,1,effect);
			    	base.radio.focus();
			    	return false;
			    },function (e){
			    	base.radio.blur();
			    	e.stopPropagation();
			    	toggleCombo(base.container,0,effect);
			    	return false;
			    });
            	
            }
            
            // Trigger fakeBox view 
		    base.handler.eq(0).click(function(){
		    	base.handler.eq(1).click();		
		    	return false;
		    });
            
            // Trigger radiobutton blur close fakebox
            base.radio.focus(function(){
                console.log("open trigger");
            });
            base.radio.blur(function(){
                console.log("close trigger");
                base.handler.eq(1).click();
            });            
            
            function toggleCombo(obj,select,effect){ // SELECT : Open / Close
				var nb = $("li",obj).size();
				
				$("li",obj).each(function(i){
					var li = $(this);
					var timer = 0;
					
					if (select) {
						base.container.css("display","block");
						if (base.options.openStyle == "normal")
							timer = (base.options.decalage*(i+1))
						else 
							timer = ((nb-i)*base.options.decalage); // open invert
						
					} else { 
						
						if (base.options.openStyle == "normal")
							timer = ((nb-i)*base.options.decalage);
						else 
							timer = (base.options.decalage*(i+1)) // close invert
					}
					$(this).css("z-index",999-i);
					
					if (effect == "normal"){
						setTimeout(function(){
							if (select)
								startAppair(li,i,base.options.openSpeed);
							else 
								disappair(li,i,base.options.openSpeed); 
						},timer);
					} else if (effect == "stair"){
						setTimeout(function(){
							if (select)
								startAppairLeft(li,i,base.options.openSpeed);
							else 
								disappairLeft(li,i,base.options.openSpeed); 
						},timer);
					}
				})
			}
			
			
			
			// choice item
			base.item.click(function(){
            	// on referme le layer
            	base.handler.eq(1).click();
            	itemValue = $("input:hidden",this).val();
            	itemContent = $(this).text();
            	
            	base.handler.eq(0).text(itemContent); // On affiche le choix 
            	var liCurrent = $(this)

            	var pos = base.item.index(liCurrent)+base.$hasHeader;// position du click + entete du select
            	$('option', base.$el).each(function(){
            		if($(this).is(':selected')) 
            			$(this).attr("selected","")
            	});
            	
            	$('option', base.$el).eq(pos).attr("selected","selected");
            	return false;
            })
			
			 function createElem(obj){
		    	var nbLi = $('option',obj).size();
    	    	var construct  = "#"+base.$el.attr("id")+"_clone";
		    	
		    	
		    	var id = base.$el.attr("id")+"_clone";
		    	obj.parent().append("<div id='"+id+"' class='wrapper-fakebox'><ul></ul><input type='radio' style='display:none' /></div>");
		    	
		    	var holder = $(construct);
		    	var i=0;
		    	
		    	holder.prepend("<a href='#' class='arrow'>></a>&nbsp;");

                $('option',obj).each(function(){
		    		
		    		var valueItem = $(this).val();
		    		var textItem =  $(this).text();

		    		if (valueItem != "") {
		    			$("ul",holder).append("<li>"+textItem+"<input type='hidden' value='"+valueItem+"' name='value' /></li>");
		    			i++;
		    		} else { 
		    			base.$hasHeader = 1;
		    			$(holder).prepend("<a href='#' class='titleCombo'>"+textItem+"</a>");
		    		}
		    	});
				
				base.heightItem = $("li",holder).outerHeight();
				
				if (options.openEffect == "stair") {
					$("ul li",holder).css({
						"position":"absolute",
						"width":($("ul",holder).width()-10)+"px",
						"left":0,
						"opacity":0
					});
					$("ul li",holder).each(function(i){
						var p = i % 2;
						
						if (!p) {
							$(this).css({"left":"-"+$("ul",holder).width()+"px"});
						} else {
							$(this).css({"left":$("ul",holder).width()+"px"});
						}
					});
				}

	    		if (nbLi == i)
	    			$(holder).prepend("<a href='#' class='titleCombo'>"+base.options.textSelect+"</a>");
		    	
		    	
		    	$("ul",holder).css("display","none")
		    }
		    
		    
		    function startAppair(obj,i,speed){
		    	
		    	var h = obj.outerHeight();
		    	obj.animate({
		    		"top":h*i,
		    		"opacity":1,
		    		"display":"block"
		    	},speed);
		    }
		    
		    function disappair(obj,i,speed){
		    	var h = obj.outerHeight();
		    	obj.animate({
		    		"top":0,
		    		"opacity":0,
		    		"display":"none"
		    	},function(){
		    		base.container.css("display","none");
		    	});
		    }
		    function startAppairLeft(obj,i,speed){
		    	
		    	var h = obj.outerHeight();
		    	var w = obj.width();

		    	obj.animate({
		    		"top":h*i,
		    		"left":0,
		    		"opacity":1,
		    		"display":"block"
		    	},speed);
		    }
		    
			function disappairLeft(obj,i,speed){
		    	var h = obj.outerHeight();
		    	var w = obj.width();
		    	var p = i % 2;
				if (!p) {
					var rw = "-"+w+"px";
				} else {
					var rw = w+"px"
				}
		    	obj.animate({
		    		"top":0,
		    		"left":rw,
		    		"opacity":0,
		    		"display":"none"
		    	},function(){
		    		base.container.css("display","none");
		    	});
		    }
        };
        base.init();
    };
    
   
    
	 
	
	
   
    
    
    $.fakebox.defaultOptions = {
        effect : "fadeIn", // choice effect aplicated : ????
        easing : "linear", // Select easing aplicated :  linear / easeOutBounce / easeOutCirc
        openSpeed : 300, // open speed layer items (ms)
        openStyle : "normal", // normal / inverse
        openEffect : "normal", // normal / stair
        decalage : 50, // temp decalage ms (only item)
        targetEffect : "list", // params : list | item
        textSelect : "Choice" // Default Text if not value null for first item
    };
    
    $.fn.fakebox = function(options){
        return this.each(function(){
            (new $.fakebox(this, options));
        });
    };
    
})(jQuery);


/*													/*
*													*
*   EXTENDS EASING for jQuery | by Robert PENNER    *
* 													*
/*													*/

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
