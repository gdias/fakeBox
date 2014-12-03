#FakeBox jQuery Plugin

Le plugin Fakebox permet de rendre plus personnalisable les combobox *&lt;select>*. Il transforme cet élément HTML en élément de liste tout en reproduisant son comportement.
La structure des plugin jQuery, permet d'etre plus adaptable à tous les cas de figure. Son utilisation est trés simple et se résume dans la pluspart des cas à une seule ligne de JS.

#Demo & Examples
http://guillaumedias.fr

#Example Usage

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
