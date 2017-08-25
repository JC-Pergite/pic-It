import { Album } from './albums/album';
import { Comment } from '../shared/comment';

export class User {
	constructor(
		public id: number,
		public name: string,
		public bio: string,
		public account: {
			 email: string,
			 password: string
		},
		public albums: Album[],
		public comments: Comment[]
	) { }
}