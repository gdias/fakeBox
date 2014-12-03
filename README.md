#FakeBox jQuery Plugin

The Fakebox plugin enables more customizable combobox. This plugin transform this HTML element in UL, LI tags while reproducing his behavior.
It have a very simple use and can be called with just a one single line.

#Integrate Demo
http://www.beatsqueeze.com/album/viewAlbum/25

#More tests case
http://data.guillaumedias.fr/fakeBox/

#Multiple Example Usage

##HTML
&lt;select class="combo"> <br/>
	&lt;option value="">Faire un choix&lt;/option> <br/>
	&lt;option value="1">Option 1&lt;/option> <br/> 
	&lt;option value="1">Option 2&lt;/option> <br/>
	&lt;option value="1">Option 3&lt;/option> <br/>
	&lt;option value="1">Option 4&lt;/option> <br/>
&lt;/select>

## jQuery
Use this plugin as follow

...
$('.combo').fakeBox();
...


#Parameter's Plugin

	| Parameter    | Explain	                    		  		 | Default |
	|--------------|-------------------------------------------------|---------|
	| effect       | String : Choice effect aplicated         		 | fadeIn  |
	| easing       | String : Select easing aplicated         		 | linear  |
	| openSpeed    | Number : Open speed layer items (ms)     		 | 300     |
	| openStyle    | String : Type open layer (normal/inverse) 		 | normal  |
	| openEffect   | String : Effect open layer (normal/stair)		 | normal  |
	| decalage     | Number : Decalage time (ms)					 | 50  	   |
	| targetEffect | String : Target for effect	(list/item)	    	 | list    |
	| textSelect   | String : Text if not value null for first item	 | Choice  |
	| addData      | Array  : Pass data in new structure    		 | {}	   |
 
