import { InMemoryDbService } from 'angular-in-memory-web-api';

export class PhotoDataService implements InMemoryDbService {
	createDb() {
		let users = [
		];

		let albums = [ 

		];

		let photos = [
   		]; 

		let categories = [ 
		  	{ id: 0, name: 'Travel', photos: 	[   { id: 0, name: 'Bangkok', type: 'Travel', photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/ad/bangkok.jpg', comments: [{id: 0, content: 'Gorgeous colors', photo_id: 0}, {id: 1, content: 'Can I take a tukk-tukk here?', photo_id: 0}], likes: {likes: 4, user_id: []} },
			  									    { id: 1, name: 'Salar de Uyuni', type: 'Travel', photoUrl: 'http://www.blueworldjourneys.com/blog/wp-content/uploads/2015/07/Salar-de-Uyuni.jpg', comments: [{id: 0, content: 'These Bolivian salt flats really are dreamlike..', photo_id: 1}, {id: 1, content: 'Siempre he querido verlo', photo_id: 1}, {id: 2, content: 'Incroyable!', photo_id: 1}], likes: {likes: 7, user_id: []}}, 
													{ id: 2, name: 'Himeji', type: 'Travel', photoUrl: 'http://japan-magazine.jnto.go.jp/jnto2wm/wp-content/uploads/1508_autumnfoliage_main.jpg', comments: [{id: 0, content: 'itte mitai na~', photo_id: 2}], likes: {likes: 5, user_id: []} },
	  									   			{ id: 3, name: 'Seattle', type: 'Travel', photoUrl: 'http://www.studentdo.com/images/Events/scenic-seattle.jpg', comments: [{id: 0, content: 'Such beauty in our own backyard!!', photo_id: 3}, {id: 1, content: 'Guau! Debo ir a este lugar, y pronto', photo_id: 0}], likes: {likes: 3, user_id: []} },
													{ id: 4, name: 'Bergen', type: 'Travel', photoUrl: 'http://voilavoyage.com/wp-content/uploads/2016/05/BRYGGEN-SNOW.jpg', comments: [{id: 0, content: 'Fjords for days', photo_id: 5}, {id: 2, content: 'samui kana~', photo_id: 1}], likes: {likes: 4, user_id: []}},
	  									   			{ id: 5, name: 'Shirahama', type: 'Travel', photoUrl: 'https://sociorocketnewsen.files.wordpress.com/2014/11/1024px-131221_shirarahama_beach_shirahama_wakayama_pref_japan07s3bs.jpg?w=580&h=386', comments: [{id: 0, content: 'White Rabbit Legend of the beach', photo_id: 6}], likes: {likes: 5, user_id: []}}
	 		  									] },
		  	{ id: 1, name: 'Culinary', photos: [  
		  											{ id: 0, name: 'Pad Thai', type: 'Culinary', photoUrl: 'http://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201311-r-xl-wild-mushroom-pad-thai.jpg?itok=mH6yFigv', comments: [{id: 0, content: 'Sweet & spicy!', photo_id: 13}], likes: {likes: 5, user_id: []}},
		  											{ id: 1, name: 'Kyo-ryori', type: 'Culinary', photoUrl: 'http://img.timeinc.net/time/photoessays/2011/travel_kyoto/06_kyo_ryori.jpg', comments: [{id: 0, content: 'Honmani oishii sou!', photo_id: 5}], likes: {likes: 6, user_id: []}},
  									   				{ id: 2, name: 'Arroz Negro', type: 'Culinary', photoUrl: 'http://www.cocinayvino.com/wp-content/uploads/2016/09/62787944_l-e1475123466890.jpg', comments: [{id: 0, content: 'Joder, que pinta tiene!', photo_id: 6}], likes: {likes: 3, user_id: []}}, 
  									   				{ id: 3, name: 'Tiradito', type: 'Culinary', photoUrl: 'http://www.umami-madrid.com/wp-content/uploads/sashimi-pulpo-final.jpg', comments: [{id: 0, content: 'Que deli!!', photo_id: 7}], likes: {likes: 2, user_id: []}}, 
			  									    { id: 4, name: 'Truffle Spaghettini', type: 'Culinary', photoUrl: 'http://cdn.ltstatic.com/2015/July/SC454592_942long.jpg', comments: [{id: 0, content: 'Benissimo!!!', photo_id: 15}, {id: 1, content: 'Tartuffi & Friends?! LOVE this place!', photo_id: 15}, {id: 2, content: "C'est magnifique", photo_id: 15}], likes: {likes: 7, user_id: []}}, 
													{ id: 5, name: 'Mille-feuille', type: 'Culinary', photoUrl: 'https://ganachepatisserie.com.au/wp-content/uploads/2017/05/millefeuille.jpg', comments: [{id: 0, content: 'Vraiment superbe!', photo_id: 12}], likes: {likes: 7, user_id: []}},
	  									   		    { id: 6, name: 'Rainbow Carrots', type: 'Culinary', photoUrl: 'https://www.naturenates.com/wp-content/uploads/RainbowSalad.jpg_1456461904_5659.jpeg', comments: [{id: 0, content: 'Yummm!', photo_id: 14}], likes: {likes: 3, user_id: []}}
  									   			] },
			{ id: 2, name: 'Design', photos: [  
		  											{ id: 0, name: 'MahaNakhon', type: 'Architecture', photoUrl: 'https://www.worldbuild365.com/media/news/00Web/POTW/MahaNakhon/xMahaNakhon,P2004.jpg.pagespeed.ic.bfEubo9zA4.jpg', comments: [{id: 0, content: 'Thought the photo was pixelated, but that was just the building!hahaha', photo_id: 18}], likes: {likes: 2, user_id: []}},
		  											{ id: 1, name: 'Carcassone', type: 'Architecture', photoUrl: 'http://pesciviaggi.it/wp-content/uploads/2016/08/TEMPLARI-SITO-OTTOBRE.jpg', comments: [{id: 0, content: 'Looks straight out of Game of Thrones!!', photo_id: 19}], likes: {likes: 8, user_id: []}},
		  											{ id: 2, name: 'Gakuen Spiral', type: 'Architecture', photoUrl: 'https://i.pinimg.com/originals/ba/26/99/ba26997ff96704d4c145524d600eea4a.jpg', comments: [{id: 0, content: 'Impresionante lo que hace Japon!', photo_id: 20}], likes: {likes: 6, user_id: []}},
		  											{ id: 3, name: 'Guangzhou Circle', type: 'Architecture', photoUrl: 'https://www.topzine.cz/wp-content/uploads/2012/03/857_0.jpg', comments: [{id: 0, content: 'China has been killing it with architecture!', photo_id: 21}], likes: {likes: 11, user_id: []}},
		  											{ id: 4, name: 'Habitat 67', type: 'Architecture', photoUrl: 'https://cdn.mtlblog.com/uploads/271245_7c6529263b703d0fb8df1a0f7d4d288025998c63.jpeg_facebook.jpeg', comments: [{id: 0, content: 'Voila! Canada a du bonne architecture!', photo_id: 22}], likes: {likes: 5, user_id: []}},
		  											{ id: 5, name: 'Minsk Library', type: 'Architecture', photoUrl: 'http://visit-belarus.com/wp-content/uploads/2017/12/minsk-2.jpg', comments: [{id: 0, content: 'Must be easy to read at night', photo_id: 23}], likes: {likes: 7, user_id: []}}
  										   		   ] 
	   		}
		];
		return { users, albums, photos, categories };
	}
}