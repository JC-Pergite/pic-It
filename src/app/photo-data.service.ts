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
		  	{ id: 0, name: 'Travel', photos: [  { id: 0, name: 'Bangkok', type: 'Travel', photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/ad/bangkok.jpg', comments: [{id: 0, content: 'Kap kun cra', photo_id: 0}, {id: 1, content: 'Mango sticky rice!', photo_id: 0}], likes: {likes: 4, user_id: []} },
		  									   { id: 1, name: 'Aurora', type: 'Travel', photoUrl: 'http://voilavoyage.com/wp-content/uploads/2016/05/BRYGGEN-SNOW.jpg', comments: [{id: 0, content: 'skoll!', photo_id: 1}, {id: 1, content: 'itte mittai~', photo_id: 1}, {id: 2, content: 'samui kana~', photo_id: 1}], likes: {likes: 7, user_id: []}}, 
												{ id: 2, name: 'Kyoto', type: 'Travel', photoUrl: 'http://img.timeinc.net/time/photoessays/2011/travel_kyoto/06_kyo_ryori.jpg', comments: [{id: 0, content: 'oishii', photo_id: 2}], likes: {likes: 5, user_id: []} },
  									   			 { id: 3, name: 'Peru', type: 'Travel', photoUrl: 'http://www.dishinanddishes.com/wp-content/uploads/2010/08/Mama-Vecas681-500x333.jpg', comments: [{id: 0, content: 'Yummm!', photo_id: 3}], likes: {likes: 3, user_id: []} },
												{ id: 4, name: 'Bergen', type: 'Travel', photoUrl: 'http://voilavoyage.com/wp-content/uploads/2016/05/BRYGGEN-SNOW.jpg', comments: [{id: 0, content: 'Fjords for days', photo_id: 5}], likes: {likes: 4, user_id: []}},
  									   			 { id: 5, name: 'Shirahama', type: 'Travel', photoUrl: 'https://sociorocketnewsen.files.wordpress.com/2014/11/1024px-131221_shirarahama_beach_shirahama_wakayama_pref_japan07s3bs.jpg?w=580&h=386', comments: [{id: 0, content: 'White Rabbit Legend', photo_id: 6}], likes: {likes: 5, user_id: []}}
 		  									   ] },
		  	{ id: 1, name: 'Culinary', photos: [  
		  											{ id: 0, name: 'Pad Thai', type: 'Culinary', photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/ad/bangkok.jpg', comments: [{id: 0, content: 'Sweet & spicy!', photo_id: 13}], likes: {likes: 5, user_id: []}},
		  											{ id: 1, name: 'Kyo-ryori', type: 'Culinary', photoUrl: 'http://img.timeinc.net/time/photoessays/2011/travel_kyoto/06_kyo_ryori.jpg', comments: [{id: 0, content: 'Honmani oishii sou!', photo_id: 5}], likes: {likes: 6, user_id: []}},
  									   				{ id: 2, name: 'Reindeer', type: 'Culinary', photoUrl: 'https://sociorocketnewsen.files.wordpress.com/2014/11/1024px-131221_shirarahama_beach_shirahama_wakayama_pref_japan07s3bs.jpg?w=580&h=386', comments: [{id: 0, content: 'Nothing like a proper reindeer stew.', photo_id: 6}], likes: {likes: 3, user_id: []}}, 
  									   				{ id: 3, name: 'Tiradito', type: 'Culinary', photoUrl: 'http://www.dishinanddishes.com/wp-content/uploads/2010/08/Mama-Vecas681-500x333.jpg', comments: [{id: 0, content: 'Que deli!!', photo_id: 7}], likes: {likes: 2, user_id: []}}, 
		  									   { id: 4, name: 'Meatballs', type: 'Culinary', photoUrl: 'http://voilavoyage.com/wp-content/uploads/2016/05/BRYGGEN-SNOW.jpg', comments: [{id: 0, content: 'skoll!', photo_id: 15}, {id: 1, content: 'itte mittai~', photo_id: 15}, {id: 2, content: 'samui kana~', photo_id: 15}], likes: {likes: 7, user_id: []}}, 
												{ id: 5, name: 'Pontocho', type: 'Culinary', photoUrl: 'http://img.timeinc.net/time/photoessays/2011/travel_kyoto/06_kyo_ryori.jpg', comments: [{id: 0, content: 'oishii', photo_id: 12}], likes: {likes: 7, user_id: []}},
  									   			 { id: 6, name: 'Sashimi', type: 'Culinary', photoUrl: 'http://www.dishinanddishes.com/wp-content/uploads/2010/08/Mama-Vecas681-500x333.jpg', comments: [{id: 0, content: 'Yummm!', photo_id: 14}], likes: {likes: 7, user_id: []}}

  									   			] }
		];
		return { users, albums, photos, categories };
	}
}