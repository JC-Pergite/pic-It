import { Photo } from '../../shared/photo';

export class Album {
	constructor(
		public id: number,
		public title: string,
		public photos: Photo[],
		public user_id?: number
	){ }
}