import { Photo } from './photo';

export class Category{
	constructor(
		public id: number,
		public name: string,
		public photos: Photo[]
	){}
}