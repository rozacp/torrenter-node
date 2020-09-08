import fetch from 'node-fetch';
import { toJson } from 'xml2json';

export default class TorrentsRepository {
  constructor(tdUser, tdToken) {
    this.tdUser = tdUser;
    this.tdToken = tdToken;
  }

  // filter torrents
  async filter() {
    const json = await this.xml();
    return json.rss.channel.item;
  }

  // parse XML link
  async xml() {
    const res = await fetch(this.rss());
    const xml = await res.text();
    return JSON.parse(toJson(xml));
  }

  // grab qualities
  qualities() {
    const qualities = [7, 34];

    return qualities.join(';');
  }

  // Format RSS Url
  rss() {
    // https://www.torrentday.com/t.rss?download;7;34;u=198412;tp=ba86e56103a9f54c17f744680d72b9c4
    return `https://www.torrentday.com/t.rss?download;${this.qualities()};u=${this.tdUser};tp=${this.tdToken}`;
  }
}
