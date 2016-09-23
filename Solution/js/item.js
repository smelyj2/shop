$(document).ready(function() {
	//отображение фото на странице item через local storage
	var imgUrl = localStorage.getItem("imgUrl");
	var bigitemImg = document.getElementsByClassName("photo_switcher-big");
	var smallitemImg = document.getElementsByClassName("photo_switcher-small");
	bigitemImg[0].style.backgroundImage = 'url('+imgUrl+')'; 
	smallitemImg[0].style.backgroundImage = 'url('+imgUrl+')';
	
	var description = localStorage.getItem("description");
	var price = localStorage.getItem("price");
	if(price == 'undefined')price = 'Price is not set yet';	
	var itemName = document.getElementsByClassName("item-name");
	var itemPrice = document.getElementsByClassName("item-price");
	itemName[0].innerHTML = description;
	itemPrice[0].innerHTML = price;
		
	
	//просмотр увелич. фотографии
		var widthNew = window.innerWidth;
		var outer = document.getElementById("bigbox");
		var elemshow = document.getElementById("infoBox");
		var elzoom = document.getElementById("zoom");
	
		outer.onmousemove = function(e) {
			var x=e.pageX;
			var y=e.pageY;
			
			var leftr = document.getElementById("bigbox").offsetLeft;
			var topr = document.getElementById("bigbox").offsetTop;
			
			var newx=(x-leftr)*1;
			var newy=(y-topr)*1;
								
			//для desctop версии
			if(widthNew >  482)	{
				var mousezoomx = y-topr - 260;
				var mousezoomy = x-leftr - 170;
				if(widthNew <  1195){
					var mousezoomx = y-topr - 260;
					var mousezoomy = x-leftr - 110;
				}	
					elzoom.style.top= mousezoomx +"px";
					elzoom.style.left= mousezoomy +"px";
					
					document.getElementById("infoBox").innerHTML ="Х "+newx  + "  У " + newy +" ll"+ elzoom;
					
					elemshow.style.backgroundImage= 'url('+imgUrl+')';
					elemshow.style.backgroundSize = "200% 200%";
					elemshow.style.backgroundPosition="-"+newx +"px -" + newy + "px";
					elzoom.style.backgroundImage = 'url('+imgUrl+')';
					elzoom.style.backgroundSize = "830px 1200px";
					
					var zoomx= (newx*2)-300;
					var zoomy= (newy*2)-500;
					elzoom.style.display="block";
					elzoom.style.backgroundPosition = "-"+zoomx +"px -" + zoomy + "px";
					elzoom.style.backgroundRepeat= "no-repeat";
				
					if(newx < 130 | newx >520){
						elzoom.style.display="none"
					}
					if(newy < 250 | newy >810){
					  elzoom.style.display="none"
					}
			//для мобильной версии
			}else if(widthNew  <481 && widthNew > 392){
					var mousezoomx = y-topr - 160;
					var mousezoomy = x-leftr - 100;
					
					elzoom.style.top= mousezoomx +"px";
					elzoom.style.left= mousezoomy +"px";
					
					document.getElementById("infoBox").innerHTML ="Х "+newx  + "  У " + newy +" ll"+ elzoom;
							
					elzoom.style.backgroundImage = 'url('+imgUrl+')';
					elzoom.style.backgroundSize = "300px 416px";
					
					var zoomx= (newx*2)-160;
					var zoomy= (newy*2)-280;
					elzoom.style.display="block";
					elzoom.style.backgroundPosition = "-"+zoomx +"px -" + zoomy + "px";
					elzoom.style.backgroundRepeat= "no-repeat";
				
					if(newx < 72 | newx >202){
						elzoom.style.display="none"
					}
					if(newy < 140 | newy >320){
					  elzoom.style.display="none"
					}
			}else if(widthNew <391){
					var mousezoomx = y-topr - 160;
					var mousezoomy = x-leftr - 80;
					
					elzoom.style.top= mousezoomx +"px";
					elzoom.style.left= mousezoomy +"px";
						
					document.getElementById("infoBox").innerHTML ="Х "+newx  + "  У " + newy +" ll"+ elzoom;
								
					elzoom.style.backgroundImage = 'url('+imgUrl+')';
					elzoom.style.backgroundSize = "300px 416px";	
					
					var zoomx= (newx*2)-120;
					var zoomy= (newy*2)-280;
					elzoom.style.display="block";
					elzoom.style.backgroundPosition = "-"+zoomx +"px -" + zoomy + "px";
					elzoom.style.backgroundRepeat= "no-repeat";
						
					if(newx < 60 | newx >165){
							elzoom.style.display="none"
						}
						if(newy < 140 | newy >320){
						  elzoom.style.display="none"
						}
			}
		}	
		
		outer.onmouseout = function(e) {
		  var elemshow =  document.getElementById("showbox");
		   elzoom.style.backgroundImage= 'none';
		}
	
	
	
	
	$(".button15").click(function(){
		
		//собираю данные с item_details_page.html
		 $(".size-tabs input[type='radio']:checked").each(function() {
			var idRadio = $(this).attr("id");
			var size = $("label[for='"+idRadio+"'] span").text();
			
			localStorage.setItem("size", size);
		});
		
		 $(".color-tabs input[type='radio']:checked").each(function() {
			var idRadio = $(this).attr("id");
			var color = $("label[for='"+idRadio+"'] span").text();
			
			localStorage.setItem("color", color);
		});
		
		
		// собираю все данные о товаре
		var imgUrl = localStorage.getItem("imgUrl");
		var descriptionItem = localStorage.getItem("description");
		var priceItem = localStorage.getItem("price");
		var colorItem = localStorage.getItem("color");
		var sizeItem = localStorage.getItem("size");
		var id =localStorage.getItem("itemId");
		
		if(priceItem == 'undefined'){
			priceItem = 0;
		}
		
		
		//ключ для хранения товаров в LocalStorage
		var itemHash = id + descriptionItem + colorItem + sizeItem;
		//убираю лишние пробелы
		var itemHash = itemHash.replace(/\s+/g, '');
		//замена спец символа &amp; на &
		var itemHash = itemHash.replace(/&amp;/g, '&');
		// Получаю данные из LocalStorage
		function getCartData(){
			 return JSON.parse(localStorage.getItem('BasketLocalStorageKey'));
		}	
		
		// получаю данные корзины или создаю новый массив если данных еще нет
		var itemCatalog = getCartData() || [];
		
		
		// если такой товар уже в корзине то добавляю +1 к его количеству
		var flag = false;
		for (var i = 0; i < itemCatalog.length; i++) {
		  if (itemCatalog[i][itemHash] && itemCatalog[i][itemHash].descriptionItem == descriptionItem && itemCatalog[i][itemHash].colorItem == colorItem && itemCatalog[i][itemHash].sizeItem == sizeItem) { 
				 itemCatalog[i][itemHash].quantityItem +=1;
				 localStorage.setItem('BasketLocalStorageKey', JSON.stringify(itemCatalog));
				 flag = true;
				 break;
		  }
			}
		
		 //если товара в корзине еще нет то добавляю в массив и обновляю данные в LocalStorage
			if (flag == false) { 
								
				var itemCatalogNew = {[itemHash]:{'imgUrl':imgUrl,'descriptionItem':descriptionItem,'priceItem':priceItem,'colorItem':colorItem,'sizeItem':sizeItem,'quantityItem':1}};
				itemCatalog.push(itemCatalogNew);
				localStorage.setItem('BasketLocalStorageKey', JSON.stringify(itemCatalog));
		    }
		
		//Очищаю хранилище от лишних данных
		localStorage.removeItem('imgUrl');
		localStorage.removeItem('description');
		localStorage.removeItem('price');
		localStorage.removeItem('itemName');
		localStorage.removeItem('itemPrice');
		localStorage.removeItem('size');
		localStorage.removeItem('color');
		localStorage.removeItem('itemId');
		
		//localStorage.clear();
		goToBag();
	
		
	});

	
	
});


function goToCatalog(){
	window.location= "catalog.html";
}

function goToBag(){
	window.location= "shopping_bag.html";
}

function goToStart(){
	window.location= "start.html";
}

