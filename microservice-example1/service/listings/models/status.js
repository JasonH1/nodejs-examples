'use strict';


class CommentsAdd {
  constructor(params) {
    this._error = '';
    this._status = params.status;
    this._id = params.id;



    // Validate the model before we send it to ES
    if (!this.isValid()) {
      throw new Error(this._error);
    }
  }

  isValid() {
    // Validation check on all the json... 
    if (!this._status) {
      this._error = 'Status parameter is missing';
      return false;
    }
    if (!this._id) {
      this._error = 'id parameter is missing';
      return false;
    }
    return true;
  }


}

module.exports = CommentsAdd;