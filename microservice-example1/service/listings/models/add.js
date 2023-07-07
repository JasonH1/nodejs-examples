'use strict';


class CommentsAdd {
  constructor(params) {
    this._error = '';
    //this._pubDate = params.pubDate;

    if (!this.isValid()) {
      console.log(this._error);
      throw new Error(this._error);
    }
  }

  isValid() {
    //if (!this._pubDate) {
    //  this._error = 'pubDate parameter is missing';
    //  return false;
    //} 
    return true;
  }


}

module.exports = CommentsAdd;