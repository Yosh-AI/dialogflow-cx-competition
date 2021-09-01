import { Injectable} from '@nestjs/common';
const { parse } = require('rss-to-json');

@Injectable()
export class Articles {
  constructor() {
  }

  async getRSSArticles() {
    const rss = await parse('https://feeds.npr.org/816541428/rss.xml');
    return rss?.items.map(e => {
      e.image = e.content.split("'").find(v => v.startsWith('https'));
      return e;
    }) || [];
  }
}
