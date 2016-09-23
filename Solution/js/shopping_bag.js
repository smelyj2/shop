
$(document).ready(function() {
	
	
	function getCatalogItems(){
		return JSON.parse(localStorage.getItem('BasketLocalStorageKey'));
	}
	
	
	//отображаю корзину товаров из ЛокалСторадж
	function drawCart() {
		var output = "";
        var allCatalogItems = getCatalogItems();
			for(var key in allCatalogItems){
				Object.keys(allCatalogItems[key]).forEach(function(key2) {
					var item = allCatalogItems[key][key2];
					
					output += 
					"<div class='shopping-block' >\
						<div class='shopping-img'>\
							<div class='img' style='background-image:url("+item.imgUrl+")'></div>\
							<span class='shopping-price'>£"+item.priceItem+"</span>\
						</div>  \
						<div class='img-info'>\
							<div class='description'>"+item.descriptionItem+"</div>\
							<div class='color'>Color: "+item.colorItem+"</div>\
							<div class='size'>Size: "+item.sizeItem+"</div>\
							<div class='quantity'>Quantity:<span class='itemCount'> "+item.quantityItem+"</span></div>\
							<a href='#0' class='del-item' data-id="+key2+">Remove item</a>\
						</div>\
					</div>";
				});
			}
			$('.main-block').last().append(output);
        
    }
	
	
    drawCart();
	
	
	
	// подсчёт всей суммы за  товары в корзине и отображение в хэдере и  главной части
	function PriceForItems(){
	
		var allCatalogItems = getCatalogItems();
		var totalPrice = 0;
		//itemCount -колво  товаров в корзине
		var itemCount =0;
		
		
		if(allCatalogItems === null){
			console.warn('localStorage is empty!');
			return;
		}	
		
		if(allCatalogItems.length >= 1){
			// подсчёт суммы товаров если товары в корзине имеются					
			for(var key in allCatalogItems){
				Object.keys(allCatalogItems[key]).forEach(function(key2) {
					var item = allCatalogItems[key][key2];
					
					itemCount +=+item.quantityItem;
					totalPrice +=item.quantityItem * item.priceItem;
				});
			}
						
			// перевожу результат в строку и через reg exp устанавливая нужный формат и отображаю это в хтмл
			var regexp = /(\d)(?=(\d\d\d)+([^\d]|$))/g;
			totalPrice = (totalPrice+'').replace(regexp, '$1 ');
			$('.cost').text( totalPrice );
			
			
			$('.header-basket-price').text(' £'+totalPrice );
			$('.header-basket-count').text(' ('+itemCount+')' );
		}	
		//если товаров в корзине нету 
		if(allCatalogItems.length === 0){
			$('.cost').text( 0 );
			$('.header-basket-price').text('');
			$('.header-basket-count').text('');
		}
		
	}
	
	
	PriceForItems();
	
	
	
	$(document.body).on('click','.del-item',function() {
		
		//проверяю itemCount(кол-во товара) если больше одного то удаляю кол-во в хтмл и хранилище
		var itemCount = $(this).parent().find('.itemCount').html();
		if (itemCount > 1){
			itemCount -=1;
			//удаляю кол-во товара в хтмл
			$(this).parent().find('.itemCount').text(itemCount);
			
			
			
			var currentItem = getCatalogItems();
			
			var dataId = $(this).attr("data-id")
		
			var currentDataId;
			var currentPosition;
			//ищу в хранилище обьект данных соответсвующий данному айди и изменяю в нём кол-во товаров
			for(var key in currentItem){
				Object.keys(currentItem[key]).forEach(function(key2) {
					if(dataId == key2){
						currentDataId = key2;
						currentPosition = key;
						currentItem[key][key2].quantityItem = itemCount;
						
					}	
				});
			}
		
			localStorage.setItem('BasketLocalStorageKey', JSON.stringify(  currentItem   ));
			
			PriceForItems();
			
		// Если кол-во товара меньше одного то сразу удаляю из хранилища и хтмл
		}else{
			// Удаляю из хранилища 
			
			var currentItem = getCatalogItems();
			
			var dataId = $(this).attr("data-id")
			for(var key in currentItem){
				Object.keys(currentItem[key]).forEach(function(key2) {
					if(dataId == key2){
						
						currentItem.splice(key, 1);
					}	
				});
			}
			
			localStorage.setItem('BasketLocalStorageKey', JSON.stringify(  currentItem   ));
			//Удаляю элемент в хтмл
			$(this).parent().parent().remove();
			
			PriceForItems();
		}
		
		
		
	});


});	

function goToCatalog(){
	window.location= "catalog.html";
}

function goToStart(){
	window.location= "start.html";
}


function emptyBag(){
	
		var allCatalogItems = JSON.parse(localStorage.getItem('BasketLocalStorageKey'));
		if(allCatalogItems == null){
			return;
		}
		
		$('.cost').text( 0 );
		$('.header-basket-price').text( '' );
		$('.header-basket-count').text( '' );
		$('.main-block').children().remove();
		$('.notification-text').text( 'Your shopping bag is empty. Use Catalog to add new items!' ).css('color','red');
		localStorage.removeItem('BasketLocalStorageKey');
		
		
		
}


function buyNow(){
	var allCatalogItems = JSON.parse(localStorage.getItem('BasketLocalStorageKey'));
	if(allCatalogItems && allCatalogItems.length){
		$('.header-basket-price').text( '' );
		$('.header-basket-count').text( '' );
		$('.main-block').children().remove();
		$('.notification-text').text( 'Thank you for your purchase!' ).css('color','green');
		$('.cost').text( 0 );
		localStorage.removeItem('BasketLocalStorageKey');
		
	}
	
}	
