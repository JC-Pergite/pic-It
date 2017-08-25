import { InMemoryDbService } from 'angular-in-memory-web-api';

export class PhotoDataService implements InMemoryDbService {
	createDb() {
		let users = [
			
		];

		let albums = [ 
			
		];

		let photos = [
			{ id: 0, name: 'Bangkok', type: 'Travel', photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/ad/bangkok.jpg', comments: ['kap kun cra'] },
			{ id: 1, name: 'Aurora', type: 'Travel', photoUrl: 'https://i.ytimg.com/vi/HB74G1tD5XI/maxresdefault.jpg', comments: ['luminous'] },
			{ id: 2, name: 'Kyo-ryori', type: 'Food', photoUrl: 'http://img.timeinc.net/time/photoessays/2011/travel_kyoto/06_kyo_ryori.jpg', comments: ['oishii'] },
			{ id: 3, name: 'Tiradito', type: 'Food', photoUrl: 'http://www.dishinanddishes.com/wp-content/uploads/2010/08/Mama-Vecas681-500x333.jpg', comments: ['yum'] } 	
   		]; 

		let categories = [ 
		  	{ id: 0, name: 'Travel', photos: [  { id: 0, name: 'Bangkok', type: 'Travel', photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/ad/bangkok.jpg', comments: ['kap kun cra']},
		  									   { id: 1, name: 'Aurora', type: 'Travel', photoUrl: 'https://i.ytimg.com/vi/HB74G1tD5XI/maxresdefault.jpg', comments: ['luminous']} ] },
		  	{ id: 1, name: 'Culinary', photos: [  { id: 2, name: 'Kyo-ryori', type: 'Food', photoUrl: 'http://img.timeinc.net/time/photoessays/2011/travel_kyoto/06_kyo_ryori.jpg', comments: ['oishii']},
  									   			 { id: 3, name: 'Tiradito', type: 'Food', photoUrl: 'http://www.dishinanddishes.com/wp-content/uploads/2010/08/Mama-Vecas681-500x333.jpg', comments: ['yum']} ] }
		];
		return { users, albums, photos, categories };
	}
}