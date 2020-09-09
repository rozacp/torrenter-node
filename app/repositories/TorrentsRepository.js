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
    const torrents = json.rss.channel.item;
    const results = [];

    torrents.forEach((torrent) => {
      this.filters().forEach((filter) => {
        const regex = new RegExp(filter, 'i');
        const avoid = new RegExp('(.*cam.*)|(.*telesync.*)|(.*hdts.*)|(.*hd-ts.*)', 'i');

        if (regex.test(torrent.title) && !avoid.test(torrent.title)) {
          results.push(torrent);
        }
      });
    });

    return results;
  }

  // parse XML link
  async xml() {
    const res = await fetch(this.rss());
    const xml = await res.text();

    return JSON.parse(toJson(xml));
  }

  // grab qualities
  filters() {
    return [
      // '^the.boys.s([0-9]{2})e([0-9]{2}).*',
      // '^the.boys.s\\d{2}e\\d{2}.*',
      '^the.boys.s(\\d{2})e(\\d{2}).*',
    ];
  }

  // grab qualities
  qualities() {
    const qualities = [7, 34];

    return qualities.join(';');
  }

  // Format RSS Url
  // https://www.torrentday.com/t.rss?download;7;34;u=198412;tp=ba86e56103a9f54c17f744680d72b9c4
  rss() {
    return `https://www.torrentday.com/t.rss?download;${this.qualities()};u=${this.tdUser};tp=${this.tdToken}`;
  }
}
