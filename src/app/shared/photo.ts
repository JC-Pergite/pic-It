import { Comment } from './comment';

export class Photo {
	constructor( 
		public id: number,
		public name: string,
		public type: string,
	    public photoUrl: string,
	    public comments: Comment[]
	) { }
}