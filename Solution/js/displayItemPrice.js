
//Данный скрипт используется для отображение общей цены за товары в части - header и кол-во товаров.

$(document).ready(function() {
	
	function PriceForItems(){
			//Избегаю возможной ошибки при первом запуске сайта когда ЛокалСторадж изначально пуст
			try{
				var allCatalogItems = JSON.parse(localStorage.getItem('BasketLocalStorageKey'));
			}catch(e){
				console.warn('Ошибка: ' + e.name + " : " + e.message);
			}	
			var totalPrice = 0;
			//itemCount -колво  товаров в корзине
			var itemCount =0;
			
			if(allCatalogItems && allCatalogItems.length >= 1){
			// подсчёт суммы товаров если товары в корзине имеются					
			for(var key in allCatalogItems){
				Object.keys(allCatalogItems[key]).forEach(function(key2) {
					itemCount +=+ allCatalogItems[key][key2].quantityItem;
					if(allCatalogItems[key][key2].quantityItem > 1){
						totalPrice +=+ allCatalogItems[key][key2].quantityItem * allCatalogItems[key][key2].priceItem;
						}else{
							totalPrice +=+ allCatalogItems[key][key2].priceItem;
							}
					});
				}
			
			
				// перевожу результат в строку и через reg exp устанавливая нужный формат и отображаю это в хтмл
				var regexp = /(\d)(?=(\d\d\d)+([^\d]|$))/g;
				totalPrice = (totalPrice+'').replace(regexp, '$1 ');
			
				
				$('.header-basket-price').text(' £'+totalPrice );
				$('.header-basket-count').text(' ('+itemCount+')' );
			}	
			//если товаров в корзине нету 
			if(allCatalogItems && allCatalogItems.length < 1){
				$('.header-basket-price').text('');
				$('.header-basket-count').text('');
			}
	}
	
	PriceForItems();
	
});	