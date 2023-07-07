'use strict';

exports = module.exports = function() {
  return {
    language: 'English',
    dictionary: {
      PARAMETERS_WRONG_FORMAT: 'Format required: `%s`',
      USERNAME_EXISTS: 'Username already exists',
      EMAIL_NOT_CHANGED: 'Email not changed',
      UUID_EXISTS: 'UUID already exists',
      USER_NOT_EXIST: 'User does not exist',
      SPECIFIC_USER_NOT_FOUND: 'User `%s` does not exist',
      EMAIL_EXISTS: 'Email already exists',
      USERINFO_SAVE_FAILED: 'Failed to save user info',
      USERNAME_NOT_CHANGED: 'Username not changed',
      PASSWORD_SAVE_FAILED: 'Failed to save password data',
      EMAIL_BINDING_FAILED: 'Failed to bind email with username',
      UUID_BINDING_FAILED: 'Failed to bind uuid with userid',
      USERNAME_BINDING_FAILED: 'Username binding has failed',
      USERNAME_ALREADY_UPDATED: 'User can change his username only once',
      INVALID_LOGIN: 'Invalid login',
      INVALID_PASSWORD: 'Invalid password',
      VALIDATION_REQUIRED: 'Account requires validation',
      INVALID_FB_URL: 'Invalid Facebook url',
      EMAIL_NOT_SENT: 'Email message was not sent',
      IMAGE_PROCESSING_ERROR: 'Image processing error',
      USER_IS_NOT_ADMIN: 'User is not admin',
      CATEGORY_NOT_EXIST: 'Category does not exist',
      SERIES_NOT_EXIST: 'Series does not exist',
      POST_NOT_FOUND: 'Post not found',
      FAILED_TO_GET_FILEINFO: 'Failed to get file info',
      WRONG_USERNAME: 'Use only alphabetic symbols and numbers in the name of user',

      // generic errors
      GENERIC_ERROR: 'Generic error',
      // database errors
      DATABASE_ERROR: 'Database operation has failed',
      CLEANUP_CANCELLED: 'Clean up process has been cancelled',
      // elasticsearch errors
      ES_ERROR: 'Elasticsearch operation has failed',
      FAILED_TO_CREATE_INDEX: 'Failed to create ES index',
      INDEX_NOT_FOUND: 'Index not found',
      FAILED_TO_CREATE_MAPPING: 'Failed to create ES mapping',
      FAILED_TO_GET_MAPPING: 'Failed to get ES mapping',
      FAILED_TO_UPDATE_MAPPING: 'Failed to update ES mapping',
      // validation errors
      MISSING_PARAMETERS: 'Missing required parameters',
      REQUIRED: '`%s` parameter is required',
      ONE_REQUIRED: 'You need to specify `%s1`',
      STRING_REQUIRED: '`%s` should be a not empty string',
      NUMBER_REQUIRED: '`%s` should be a number',
      EMAIL_REQUIRED: '`%s` should be an email string like `name@address.com`',
      ARRAY_REQUIRED: '`%s` should be an array',
      OBJECT_REQUIRED: '`%s` should be an object',
      DATE_REQUIRED: '`%s` should be a date',
      FUNCTION_REQUIRED: '`%s` should be a function',
      INCORRECT_COORDINATES: 'Incorrect coordinates',
      ALLOWED_VALUES: 'Allowed values for `%s1`: %s2',
      VALIDATOR_WRONG_OPTIONS_FORMAT: 'Validator wrong options format in `%s`',
      // code functionality errors
      CONTROLLER_NOT_EXIST: 'Controller `%s` does not exist',
      MODEL_NOT_EXIST: 'Model `%s` does not exist',
      METHOD_NOT_EXIST: '`%s` method does not exist',
      // authorization errors
      INVALID_TOKEN: 'Invalid token',
      UNAUTHORIZED: 'Unauthorized',
      UNALLOWED: 'You don\'t have enough permissions to use this function',
      WRONG_CREDENTIALS: 'Login or password incorrect',
      // users errors
      USER_NOT_FOUND: 'User not found',
      USER_EXISTS: 'User with same login already exists',
      GROUP_NOT_FOUND: 'Group not found',
      CANNOT_CHANGE_YOUR_GROUP: 'You can\'t change your own group',
      INCORRECT_PASSWORD: 'Incorrect password',
      // objects errors
      FAILED_TO_GET_ID: 'Failed to get new ID',
      LANGUAGE_NOT_FOUND: 'Language not found',
      LANGUAGE_EXISTS: 'Language already exists',
      DEFAULT_LANGUAGE: 'This is a default language',
      CATEGORY_NOT_FOUND: 'Category not found',
      CATEGORY_EXISTS: 'Category with same caption already exists',
      SHOP_NOT_FOUND: 'Shop not found',
      SHOP_EXISTS: 'Shop with same title already exists in this category',
      ITEM_NOT_FOUND: 'Item not found',
      ITEM_ID_EXISTS:  'Item with same id already exists',
      NOT_ALLOWED_TO_EDIT_ITEM: 'You are not allowed to edit this item',
      NOT_ALLOWED_TO_REMOVE_ITEM: 'You are not allowed to remove this item',
      NOT_ALLOWED_TO_EDIT_DEFAULT_ITEM_CATEGORY: 'You are not allowed to edit default item categoyry',
      NOT_ALLOWED_TO_REMOVE_DEFAULT_ITEM_CATEGORY: 'You are not allowed to remove default item categoyry',

      LOCATION_NOT_FOUND: 'Location not found',

      INVALID_ID: 'Invalid id'
    }
  };
};
