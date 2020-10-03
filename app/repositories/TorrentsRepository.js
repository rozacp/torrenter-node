/**
 * Torrents Repository
 */

import fetch from 'node-fetch';
import { toJson } from 'xml2json';
import Filter from '../models/Filter';
import Quality from '../models/Quality';

export default class TorrentsRepository {
  constructor(tdUser, tdToken) {
    this.tdUser = tdUser;
    this.tdToken = tdToken;
  }

  // filter torrents
  async filter() {
    const filters = await this.filters();
    const json = await this.xml();
    const torrents = json.rss.channel.item;
    const results = [];

    torrents.forEach((torrent) => {
      filters.forEach((filter) => {
        const regex = new RegExp(filter.pattern, 'i');
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
    const rss = await this.rss();
    const res = await fetch(rss);
    const xml = await res.text();

    return JSON.parse(toJson(xml));
  }

  // grab filters
  async filters() {
    const filters = await Filter.find();

    return filters;
  }

  // grab qualities
  async qualities() {
    const codes = [];
    const qualities = await Quality.find();
    qualities.map(quality => codes.push(quality.code));

    return codes.join(';');
  }

  // Format RSS Url
  // https://www.torrentday.com/t.rss?download;7;34;u=198412;tp=ba86e56103a9f54c17f744680d72b9c4
  async rss() {
    const qualities = await this.qualities();
    return `https://www.torrentday.com/t.rss?download;${qualities};u=${this.tdUser};tp=${this.tdToken}`;
  }
}
