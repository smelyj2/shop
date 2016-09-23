 window.onresize = function() {
            document.getElementById("size").innerHTML = window.innerWidth;
 };

$(document).ready(function() {
	
  var selectAfter  = $('#after');
  var selectBefore = $('#before');
  var numBefore = 1;

  checkBefore();
  $(window).resize( checkBefore );
  
  //определяю размер и подстраиваю под него нужное кол-во изображений каталога
  function checkBefore() {
		var widthNew = window.innerWidth;
		if(widthNew <  481 ){
			delAfterImg(4); //кол-во удалённых изображений каталога в мобильной версии, (4 последних)
			setBefore(2) 
		}
		else if(widthNew < 1025){
			addAfterImg(4); // восстанавливаю кол-во удалённых изображений каталога в мобильной версии при увеличении экрана, (4 последних)
			setBefore(3)
		}
		else{
			addAfterImg(4);
			setBefore(4)
		};
  }
	
  // регулирует отображение картинок каталога
  function setBefore( numNew ) {
	while (numBefore > numNew) {
		// вставляет изобр. перед текстом
	  selectBefore.children( 'div:last-child' ).prependTo( selectAfter ); 
	  numBefore--;
    }
    while (numBefore < numNew) {
		// вставляет изобр. после текста
      selectAfter.children( 'div:first-child' ).appendTo( selectBefore );
	  numBefore++;
    }
  }
  
  function delAfterImg (num){
	  var collection = selectAfter.children('div');
	  for(var i = 1; i <= num; i++){
		  collection.eq(- i).css('display','none');
		  
	  }
	  
  }
  
   function addAfterImg (num){
	  var collection = selectAfter.children('div');
	  for(var i = 1; i <= num; i++){
		  collection.eq(- i).css('display','inline-block');
		  
	  }
	  
  }
 

	
 
	
	// передача в local storage инфо про товар для дальнейшей покупки
	$(".catalog-img").click(function(){
		var img = $(this)[0].firstChild.src;
			
		var description = $(this).find('.description').html();
		var price = $(this).find('.price').html();
		var itemId = this.getAttribute('data-id')
		
		
		localStorage.setItem("itemId", itemId);
		localStorage.setItem("imgUrl", getImgUrl(img));
		localStorage.setItem("description", description);
		localStorage.setItem("price", price);
		window.location= "item_details_page.html";
	});
  
	function getImgUrl(imgUrl){
		var imgSrcArr = imgUrl.match(/images\/catalog\/catalog[0-9]+.jpg$/);
		var imgSrcStr =imgSrcArr[0];
		return imgSrcStr;
	}
	
	function getImgDescription(){
		
	}	
  
  
  
  
});

function goToStart(){
	window.location= "start.html";
}

