import { Comment } from './comment';
import { User } from '../user/user';

export class Photo {
	constructor( 
		public id: number,
		public name: string,
		public type: string,
	    public photoUrl: string,
	    public comments: Comment[],
		public likes?: {
			likes: number,
			user_id?: User[] 
		}
	) { }
}