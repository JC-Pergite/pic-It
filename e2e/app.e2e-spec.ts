import { PicItPage } from './app.po';

describe('pic-it App', () => {
  let page: PicItPage;

  beforeEach(() => {
    page = new PicItPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
