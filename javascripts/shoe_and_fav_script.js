$( function() {
			
			$( "#tab" ).tabs();	//tab widget
			$("button").button();	//button widget for the add to favourite list
			
			var $shoe = $( "#shoe" );
			var $favorite = $( "#favorite" );
			
			// shoe -> draggable
			$( "div", $shoe ).draggable({
				revert: "invalid", // when not dropped, the item will revert back to its initial position
				helper: "clone",
				cursor: "move"
			});
			
			// favorite -> droppable(stores favorite items)
			$favorite.droppable({
				accept: "#shoe > div",
				drop: function( event, ui ) {
					addFavorite( ui.draggable );
				}
			});
			
			// shoe -> droppable (stores the favorite items)
			$shoe.droppable({
				accept: "#favorite div",
				drop: function( event, ui ) {
					returnshoe( ui.draggable );
				}
			});
			
			// shoe adding function
			var returnIcon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Return back this shoe' class='ui-icon ui-icon-refresh'>Recycle image</a>";
			function addFavorite( $item ) {
				$item.fadeOut(function() {
				var $list = $( "section", $favorite ).length ?
					$( "section", $favorite ) :
					$( "<section class='shoe reset'/>" ).appendTo( $favorite );
					
				$item.find( "a.ui-icon-favorite" ).remove();
				$item.append( returnIcon ).appendTo( $list ).fadeIn(function() {
					$item
					.animate({ width: "48px" })
					.find( "img" )
						.animate({ height: "36px" });
				});
				});
				$favorite.find( "p" ).remove();
				$( "<p class='paragraph' style = 'color:#361f07'>*shoe Added to Favourites*</p>" ).appendTo( $shoe );	//added when shoe is added to favorite
			}
			
			// shoe return back function
			var delIcon = "<a href='link/to/favorite/script/when/we/have/js/off' title='add favorite shoe' class='ui-icon ui-icon-favorite'>favorite shoe</a>";
			function returnshoe( $item ) {
				$item.fadeOut(function() {
					$item
						.find( "a.ui-icon-refresh" )
							.remove()
						.end()
						.css( "width", "96px")
						.append( delIcon )
						.find( "img" )
							.css( "height", "72px" )
						.end()
						.appendTo( $shoe )
						.fadeIn();
				});
				$( "<p class='paragraph' style = 'color:#361f07'>*Drag the shoe to favorites if you like*</p>" ).appendTo( $favorite );
				$shoe.find( ".paragraph" ).remove();//removed when shoe is removed
			}
			
			// when the icons are pressed
			$( "section.shoe > div" ).on( "click", function( event ) {
				if ( $( event.target ).is( "a.ui-icon-favorite" ) ) {
					addFavorite( $( this ) );
				} else if ( $( event.target ).is( "a.ui-icon-refresh" ) ) {
					returnshoe( $( this ) );
				}
				return false;
			});
			
} );

$(document).ready(function(){
	
			var favShoes=[];
			$("#fav_button").on("click", function () {	//when the add to favourite list button on shoe page is clicked  
				try{
			
					$(this).attr('disabled',true);
					
					//get the shoe id to be added to the favorite list
					var shoeToAdd = $(this).closest("p").attr("id");	
					//add the shoe id to the arrays of the favorite shoe
					favShoes.push(shoeToAdd);	
					//console.log(favShoes)
					//add the content in the array to the local storage
					sessionStorage.setItem("favProp", JSON.stringify(favShoes));	
				}catch (e) {
					
					sessionStorage.removeItem("favProp");
					var shoeToAdd = $(this).closest("p").attr("id");	
					//add the shoe id to the arrays of the favorite shoe
					favShoes.push(shoeToAdd);	
					//console.log(favShoes)
					//add the content in the array to the local storage
					sessionStorage.setItem("favProp", JSON.stringify(favShoes));	
				}
					
			});
			
			$("#view_fav").on("click", function () {	//when view favorite properties button on the favorite page is clicked 
				
				console.log("Retrieving and storing data from local storage");
				
				favShoes = JSON.parse(sessionStorage.getItem("favProp"));
				//console.log(favShoes);
				var output="<div>";
				if(favShoes !=null){

					for (var i = 0; i < data.shoes.length; i++){

						for (j=0; j< favShoes.length; j++){
							//console.log(favShoes[j]);
							if (data.shoes[i].id == favShoes[j])	// getting data of the shoe
							{
								output+="<section class = 'shoe' >" + 
								 "<br>" + "<img src=../" + data.shoes[i].picture + " alt = 'favourite_img' >" + "<br>" +
								 "<ul> <li>" + data.shoes[i].description + "</li>" + 
								 "<li>" + "$" +data.shoes[i].price + "</li>" + 
								 "<li>" +"<a href=../" + data.shoes[i].url + ">" + "click to view shoe" + "</a>" + "</li>" + 
								 "</ul>"+ "<br> </section>";
							}
						}
					}
				}
				output+="</div>";
				document.getElementById("favourite_placeholder").innerHTML = output;	//output is shown on the favourite page
			});
});